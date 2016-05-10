"use strict";

const electron = require('electron');
const dialog = electron.dialog;
const app = electron.app;  // Control application life
const BrowserWindow = electron.BrowserWindow;  // Native browser window 

// Keep a global reference of the window object
var mainWindow = null; 

// Quit when all windows are closed. 
app.on('window-all-closed', function() { 
    app.quit(); 
});

// This method will be called when Electron has finished 
// initialization and is ready to create browser windows. 
app.on('ready', function() { 
    mainWindow = new BrowserWindow({
        width: 675,
        height: 400,
        useContentSize: true,
        resizable: false,
        textAreasAreResizable: false
    }); 
    mainWindow.loadURL('file://' + __dirname + '/client/index.html'); 
    mainWindow.on('closed', function() { 
        mainWindow = null; 
    }); 
});