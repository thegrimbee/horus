// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron');

// Allows browseFolder.js to use dialog.showOpenDialog. Increases security by only exposing the needed api
contextBridge.exposeInMainWorld(
  'dialogAPI',
  {
    showOpenDialog: () => ipcRenderer.invoke('show-open-dialog'),
    fs: {
      readDir: (path) => ipcRenderer.invoke('read-dir', path),
      readFile: (path) => ipcRenderer.invoke('read-file', path),
    }
  }
);