var app = require('app');
var ipc = require('ipc');
var Menu = require('menu');
var BrowserWindow = require('browser-window');

var appMenu = require('./menu_config/app_menu');

require('crash-reporter').start();

var debug = process.env.NODE_ENV === 'development';

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  //instantiate menu from template
  menu = Menu.buildFromTemplate(appMenu);
  Menu.setApplicationMenu(menu);

  mainWindow = new BrowserWindow({ width: 1245,
                                   height: 800,
                                   'min-width': 864});

  if (debug) {
    mainWindow.loadUrl('file://' + __dirname + '/app/index.dev.html');
    mainWindow.openDevTools();
  } else {
    mainWindow.loadUrl('file://' + __dirname + '/app/index.prod.html');
  }

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

});