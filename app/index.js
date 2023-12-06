const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  const indexPath = path.join(__dirname, 'build', 'index.html');
  mainWindow.loadFile(indexPath);
});
