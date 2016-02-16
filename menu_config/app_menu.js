var app = require('app');
var menuOptions = require('./menu-config-options');

//prepare themes
function prepareThemeSubmenu() {
  var themeSubmenu = []
  for(var i = 0; i <  menuOptions.themes.length; i++) {
    var labels = {}
    labels.label = menuOptions.themes[i][0]
    labels.sublabel = menuOptions.themes[i][1]
    labels.click = function(item, browserWindow) {
      browserWindow.webContents.send('change-theme', item.sublabel);
    }

    themeSubmenu.push(labels);
  }
  return themeSubmenu;
}

//prepare language
function prepareLanguagesSubmenu() {
  var languageSubmenu = [];
  for(var i = 0; i < menuOptions.languages.length; i++) {
    var labels = {}
    labels.label = menuOptions.languages[i][0]
    labels.sublabel = menuOptions.languages[i][1]
    labels.click = function(item, browserWindow) {
      browserWindow.webContents.send('change-language', item.sublabel);
    }

    languageSubmenu.push(labels);
  }
  return languageSubmenu;
}

// Define menu template
var template = [
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Run',
        accelerator: 'CmdOrCtrl+B',
        click: function(item, browserWindow) {
          browserWindow.webContents.send('run');
        }
      },
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        selector: 'undo:'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        selector: 'redo:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        selector: 'cut:'
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        selector: 'copy:'
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        selector: 'paste:'
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        selector: 'selectall:'
      },
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.reload();
        }
      },
      {
        label: 'Theme',
        submenu: prepareThemeSubmenu()
      },
      {
        label: 'Toggle Full Screen',
        accelerator: (function() {
          if (process.platform == 'darwin')
            return 'Ctrl+Command+F';
          else
            return 'F11';
        })(),
        click: function(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        }
      },
    ]
  },
  {
    label: 'Languages',
    submenu: prepareLanguagesSubmenu()
  },
  {
    label: 'Window',
    selector: 'window:',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        selector: 'minimize:'
      },
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        selector: 'close:'
      },
    ]
  },
  {
    label: 'Help',
    selector: 'help:',
    submenu: [
      {
        label: 'Learn More',
        click: function() { require('shell').openExternal('https://github.com/andela-earinde') }
      },
    ]
  },
];

if (process.platform == 'darwin') {
  var name = require('app').getName();
  template.unshift({
    label: 'Bellatrix',
    submenu: [
      {
        label: 'About ' + name,
        selector: 'about:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Services',
        selector: 'services:',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        label: 'Hide ' + name,
        accelerator: 'Command+H',
        selector: 'hide:'
      },
      {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        selector: 'hideothers:'
      },
      {
        label: 'Show All',
        selector: 'unhide:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: function() { app.quit(); }
      },
    ]
  });
  // Window menu.
  template[4].submenu.push(
    {
      type: 'separator'
    },
    {
      label: 'Bring All to Front',
      selector: 'front:'
    }
  );
}

// Add  developer tool only during development
if (true) {
  template[2].submenu.push(
    {
      label: 'Toggle Developer Tools',
      accelerator: (function() {
        if (process.platform == 'darwin')
          return 'Alt+Command+I';
        else
          return 'Ctrl+Shift+I';
      })(),
      click: function(item, focusedWindow) {
        if (focusedWindow)
          focusedWindow.toggleDevTools();
      }
    }
  );
}

module.exports = template;
