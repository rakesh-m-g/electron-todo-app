"use strict";

var _require = require('electron'),
    app = _require.app,
    BrowserWindow = _require.BrowserWindow;

var path = require('path');

var mainWindow;
app.on("ready", function () {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  var indexPath = path.join(__dirname, 'build', 'index.html');
  mainWindow.loadFile(indexPath);
});