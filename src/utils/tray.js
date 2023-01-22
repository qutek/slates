// eslint-disable-next-line import/no-extraneous-dependencies
const { Tray, Menu, globalShortcut, screen } = require('electron');
const path = require('path');

class TrayWindow {
  constructor(icon, windowContent) {
    this.icon = icon;
    this.windowContent = windowContent;
  }

  setWindowPosition() {
    const primaryDisplay = screen.getPrimaryDisplay();
    // const { width: displayWidth } = primaryDisplay.workAreaSize;
    const windowBounds = this.windowContent.getBounds();
    const trayBounds = this.tray.getBounds();
    // const x = Math.round(displayWidth - windowBounds.width);
    const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2));
    const y = Math.round(trayBounds.y + trayBounds.height);
    console.log('setWindowPosition', { x, y, tX: trayBounds.x, tY: trayBounds.y})
    this.windowContent.setPosition(x, y, false);
  }

  toggleWindow() {
    const isVisible = this.windowContent.isVisible();
    console.log('TOOGLE', isVisible)
    if (isVisible) {
      this.windowContent.hide();
    } else {
      this.setWindowPosition();
      // this.windowContent.setVisibleOnAllWorkspaces(true);
      this.windowContent.show();
      // this.windowContent.setVisibleOnAllWorkspaces(false);
      this.windowContent.focus();
    }
  }

  initialize() {
    this.tray = new Tray(this.icon);
    this.setWindowPosition();

    this.tray.on('click', () => {
      this.toggleWindow();
    });
  };
}

module.exports = TrayWindow;