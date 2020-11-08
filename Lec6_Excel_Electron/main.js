// create main.js file 
// npm init -y
// npm install electron
// add "start":"electron ."

const electron = require("electron");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;


function createWindow () {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true // desktop application usme node enabled hojaega
      }
    })
    win.loadFile('index.html').then(function(){
        win.maximize();
        win.webContents.openDevTools() // you will get dev tools opened by default 
    });
  }



app.whenReady().then(createWindow)