// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
console.log('preload.js loaded');
const { contextBridge, ipcRenderer } = require('electron');

// Allows browseFolder.js to use dialog.showOpenDialog. Increases security by only exposing the needed api
contextBridge.exposeInMainWorld(
  'dialogAPI',
  {
    showOpenDialog: () => ipcRenderer.invoke('show-open-dialog'),
    fs: {
      readDir: (path) => ipcRenderer.invoke('read-dir', path),
      readFile: (path) => ipcRenderer.invoke('read-file', path),
      writeFile: (path, data) => ipcRenderer.invoke('write-file', path, data),
      statSync: (path) => ipcRenderer.invoke('stat-sync', path),
    }
  }
);

console.log('preload.js exposed dialogAPI');

contextBridge.exposeInMainWorld(
  'spawnAPI',
  {
    spawn: (command, args, options) => ipcRenderer.invoke('spawn', command, args, options),
    pathJoin: (...args) => ipcRenderer.invoke('path-join', ...args),
  }
);