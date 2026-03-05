const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  onClipboardUpdate: (callback) => {
    ipcRenderer.on('clipboard-update', (event, data) => {
      callback(data);
    });
  }
});
