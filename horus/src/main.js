console.log('main.js loaded');
const { app, BrowserWindow } = require('electron');
const path = require('node:path');

const { ipcMain, dialog } = require('electron');
const fs = require('fs');

const spawn = require('child_process').spawn;
const { Menu } = require('electron');

ipcMain.handle('spawn', async (event, command, args, options) => {
  return new Promise((resolve, reject) => {
    console.log('main')
    const process = spawn(command, args, options);

    let result = '';

    process.stdout.on('data', (data) => {
      result += data.toString();
    });

    process.stderr.on('data', (data) => {
      reject(data.toString());
    });
    
    process.stderr.on('data', (data) => {
      reject(data.toString());
    });
    console.log('result', result);
    process.on('close', (code) => {
      if (code === 0) {
        resolve(result);
      } else {
        reject(`Process exited with code ${code}`);
      }
    });
  });
});

ipcMain.handle('path-join', async (event, ...args) => {
  return path.join(__dirname, ...args);
});

ipcMain.handle('write-file', async (event, path, data) => {
  try {
    fs.writeFileSync(path, data);
  } catch (error) {
    console.error('Failed to write file', error);
  }
});

ipcMain.handle('read-file', async (event, path) => {
  try {
    const data = await fs.promises.readFile(path, 'utf8');
    return data;
  } catch (error) {
    console.error('Failed to read file', error);
    throw error;
  }
});

ipcMain.handle('read-dir', async (event, path) => {
  try {
    const files = await fs.promises.readdir(path);
    return files;
  } catch (error) {
    console.error('Failed to read directory', error);
    throw error;
  }
});

ipcMain.handle('stat-sync', async (event, path) => {
  try {
    return fs.statSync(path).isDirectory();
  } catch (error) {
    console.error(`Error reading path: ${path}`, error);
    return false;
  }
});

ipcMain.handle('show-open-dialog', () => {
  return dialog.showOpenDialogSync({ properties: ['openDirectory'] });
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;
const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // prevent the renderer process from accessing the Node.js API to increase security
      contextIsolation: true,
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open',
        accelerator: 'CmdOrCtrl+O',
        click: () => {
          // Add your open file logic here
        }
      },
      {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click: () => {
          // Add your save file logic here
        }
      },
      {
        label: 'Exit',
        accelerator: 'CmdOrCtrl+Q',
        click: () => {
          app.quit();
        }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
      },
      { type: 'separator' },
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectAll'
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: () => {
          mainWindow.reload();
        }
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: 'CmdOrCtrl+Shift+I',
        click: () => {
          mainWindow.webContents.toggleDevTools();
        }
      }
    ]
  },
  {
    label: 'Help',
    click: () => {
      mainWindow.webContents.send('open-user-guide');
    }
  }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
