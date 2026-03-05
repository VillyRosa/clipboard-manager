const { app, BrowserWindow, clipboard, globalShortcut, Tray, Menu } = require('electron');
const path = require('path');

let mainWindow;
let lastText = '';
let isQuitting = false;
let tray;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 330,
    height: 400,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadURL('http://localhost:4200');
}

app.whenReady().then(() => {
  createWindow();

  setInterval(() => {
    const currentText = clipboard.readText();

    if (currentText && currentText !== lastText) {
      lastText = currentText;

      mainWindow.webContents.send('clipboard-update', currentText);
    }
  }, 1000);

  mainWindow.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow.hide();

      if (process.platform === 'darwin') {
        app.dock.hide();
      }
    }
  });

  globalShortcut.register('CommandOrControl+Shift+V', () => {
    if (!mainWindow) return;

    if (!mainWindow.isVisible()) {
      mainWindow.show();
    }

    mainWindow.focus();
  });

  tray = new Tray(path.join(__dirname, 'icon.png'));

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open',
      click: () => mainWindow.show()
    },
    {
      label: 'Quit',
      click: () => {
        isQuitting = true;
        app.quit();
      }
    }
  ]);

  tray.setToolTip('Clipboard App');
  tray.setContextMenu(contextMenu);
});
