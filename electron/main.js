const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
  });

  mainWindow.loadURL('http://localhost:4200');
}

app.whenReady().then(() => {
  createWindow();
});