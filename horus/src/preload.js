// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron');

// Allows browseFolder.js to use dialog.showOpenDialog
contextBridge.exposeInMainWorld(
  'dialogAPI',
  {
    showOpenDialog: () => ipcRenderer.invoke('show-open-dialog')
  }
);