import { app, globalShortcut, session, nativeTheme, BrowserWindow } from 'electron';
import Store from 'electron-store';
import { Slates } from '@utils/slates';
import { setUpdateNotification } from 'electron-update-notifier';
import * as path from 'path';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let slates;

const store = new Store({
  watch: true,
  defaults: {
    useMini: false,
    isDarkMode: nativeTheme.shouldUseDarkColors,
    sourceLang: 'auto',
    targetLang: 'id',
    reverseTranslate: false,
    openAtLogin: true,
    enableShortcut: true,
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  try {
    slates = new Slates(app, store);

    setUpdateNotification();
    if (!app.isPackaged) {
      // https://github.com/electron/electron/issues/36545
      // https://polypane.app/docs/downgrading-react-devtools/
      const DEVTOOL_PATH = path.resolve(path.join(__dirname, '..', '..', 'extensions/react-devtool-4.27')); // __dirname is the main directory from the .webpack dir.
      console.log('Loading devtool extension from: ', DEVTOOL_PATH);
      await session.defaultSession.loadExtension(DEVTOOL_PATH, { allowFileAccess: true });
    }
  } catch (error) {
    console.log('error', error)
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0 && slates) {
    slates.initialize();
  }
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
});
