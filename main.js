var app = require('app');
var BrowserWindow = require('browser-window');

require('crash-reporter').start();
var debug = process.env.NODE_ENV === 'development';

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {

  mainWindow = new BrowserWindow({width: 1245, height: 800});

  mainWindow.loadUrl('file://' + __dirname + '/app/index.html');

  if(debug) {
    mainWindow.openDevTools();
  }

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

});