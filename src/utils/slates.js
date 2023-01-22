import { Tray, BrowserWindow, ipcMain, screen, Menu, globalShortcut, clipboard } from 'electron';
import { default as fetch } from 'electron-fetch';
import * as path from 'path';
import { upsertKeyValue } from '@utils/common';
import pick from 'lodash/pick';

const SHORTCUT = 'CommandOrControl+;';
const ICON_PATH = path.join(__dirname, '../assets/tray-icon.png');

const DEFAULT_WINDOW_WIDTH = 850;
const DEFAULT_WINDOW_HEIGHT = 500;
const MINI_WINDOW_WIDTH = 600;
const MINI_WINDOW_HEIGHT = 100;

export class Slates {
  constructor(app, store) {
    this.app = app;
    this.store = store;

    this.initialize();
    this.setupListener();

    if (app.isPackaged) {
      app.setLoginItemSettings({
        openAtLogin: store.get('openAtLogin'),
      });
    }
  }

  initialize() {
    this.createTray();
    this.createWindow();
    this.setShortcut();
  }

  popupContextMenu() {
    const menu = [
      {
        label: 'Enable Shortcut',
        sublabel: SHORTCUT,
        type: 'checkbox',
        checked: this.store.get('enableShortcut'),
        click: (event) => this.setShortcut(event.checked),
      },
      {
        label: 'Open on Startup',
        type: 'checkbox',
        checked: this.store.get('openAtLogin'),
        click: (event) => this.store.set('openAtLogin', event.checked),
      },
      {
        type: 'separator'
      },
      {
        role: 'quit',
        accelerator: 'Command+Q'
      }
    ];

    this.tray.popUpContextMenu(Menu.buildFromTemplate(menu));
  }

  createTray() {
    this.tray = new Tray(ICON_PATH);
    this.tray.on('click', () => this.toggleShowWindow());
    this.tray.on('right-click', () => this.popupContextMenu());
  }

  createWindow() {
    this.mainWindow = new BrowserWindow({
      show: !this.store.get('useMini'), // @todo | Check if run from autostart
      frame: false,
      transparent: true,
      minWidth: DEFAULT_WINDOW_WIDTH,
      width: DEFAULT_WINDOW_WIDTH,
      height: DEFAULT_WINDOW_HEIGHT,
      minHeight: DEFAULT_WINDOW_HEIGHT,
      skipTaskbar: true,
      webPreferences: {
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      },
    });

    // and load the index.html of the app.
    this.mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    this.mainWindow.webContents.session.webRequest.onBeforeSendHeaders((details, callback) => {
      const { requestHeaders } = details;
      upsertKeyValue(requestHeaders, 'Access-Control-Allow-Origin', ['*']);
      callback({ requestHeaders });
    });

    this.mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
      const { responseHeaders } = details;
      upsertKeyValue(responseHeaders, 'Access-Control-Allow-Origin', ['*']);
      upsertKeyValue(responseHeaders, 'Access-Control-Allow-Headers', ['*']);
      callback({
        responseHeaders,
      });
    });
  }

  setWindowPosition(useMini = null) {
    if (!this.mainWindow) {
      return;
    }

    if (null !== useMini) {
      this.store.set('useMini', useMini);
    } else {
      useMini = this.store.get('useMini');
    }

    if (useMini) {
      const primaryDisplay = screen.getPrimaryDisplay();
      const { width: displayWidth } = primaryDisplay.workAreaSize;
      const trayBounds = this.tray.getBounds();
      // const x = Math.round(displayWidth - 400);
      const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (MINI_WINDOW_WIDTH / 2));
      const y = Math.round(trayBounds.y + trayBounds.height);

      this.mainWindow.setBounds({ x, y, width: MINI_WINDOW_WIDTH, height: MINI_WINDOW_HEIGHT }, true);
      this.mainWindow.setResizable(false);
      this.mainWindow.setMovable(false);
    } else {
      // restore bounds.
      const windowBounds = this.store.get('windowBounds');
      this.mainWindow.setBounds(windowBounds, true);
      this.mainWindow.setResizable(true);
      this.mainWindow.setMovable(true);
    }
  }

  toggleShowWindow() {
    if (!this.mainWindow) {
      return;
    }

    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      this.setWindowPosition();
      this.mainWindow.setVisibleOnAllWorkspaces(true);
      this.mainWindow.show();
      this.mainWindow.setVisibleOnAllWorkspaces(false);
      this.mainWindow.focus();
    }
  }

  setShortcut(enabled = null) {
    if (null !== enabled) {
      this.store.set('enableShortcut', enabled);
    } else {
      enabled = this.store.get('enableShortcut');
    }

    if (!enabled) {
      // Unregister all shortcuts.
      globalShortcut.unregisterAll();
    } else {
      // register shortcut
      globalShortcut.register(SHORTCUT, () => {
        this.toggleShowWindow();
      });
    }
  }

  setupListener() {
    // Handle useMini store change.
    this.store.onDidChange('useMini', (value) => this.setWindowPosition(value));

    // Handle ipc messages.
    ipcMain.handle('get-audio', this.getAudio);

    // Handle state sync.
    ipcMain.handle('slates-store', async (event, action, payload = null) => {
      switch (action) {
        case 'get':
          // pick only setting we want to sync with client state / zustand.
          const mainState = pick(this.store.store, ['useMini', 'isDarkMode', 'sourceLang', 'targetLang', 'reverseTranslate']);
          try {
            const value = JSON.stringify({
              state: mainState,
              version: payload, // we store version in payload
            });
            return value;
          } catch (error) {
            console.error('Failed to response get slates-store', error);
            return null;
          }

        case 'set':
          const { state: clientState } = JSON.parse(payload);
          this.store.set(clientState);
          return true;

        default:
          console.error('Unhandled action', action);
          return true;
      }
    });

    // Handle clipboard operation
    ipcMain.handle('copy', async (event, value) => {
      const validValue = !!value ? value : '';
      clipboard.writeText(validValue);
      return true;
    });

    // Handle window operation
    ipcMain.handle('window', async (event, action) => {
      switch (action) {
        case 'fullscreen':
          const isFullScreen = this.mainWindow.isFullScreen();
          this.mainWindow.setFullScreen(!isFullScreen);
          break;

        default:
          this.mainWindow[action]();
          break;
      }
    });

    // handle window operations.
    this.mainWindow.on('will-resize', (_, newBounds) => this.store.set('windowBounds', newBounds))
    this.mainWindow.on('will-move', (_, newBounds) => this.store.set('windowBounds', newBounds))

    // set initial state on dom ready.
    this.mainWindow.webContents.once("dom-ready", () => {
      if (!this.app.isPackaged) {
        this.mainWindow.webContents.openDevTools();
      } else {
        // disable devtool shortcut
      }
    });
  }

  async getAudio(event, url) {
    try {
      const data = await fetch(url)
        .then(res => res.buffer())
        .then(buffer => {
          const data = buffer.toString('base64');
          return `data:audio/wav;base64,${data}`;
        })
        .catch(err => {
          console.error(err);
        });

      return data;
    } catch (error) { }
  }
}
