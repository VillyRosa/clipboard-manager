const { app, BrowserWindow, clipboard } = require('electron');
const path = require('path');

let mainWindow;
let lastText = '';

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
});
