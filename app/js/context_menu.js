var remote = window.require('remote');
var Menu = remote.require('menu');
var MenuItem = remote.require('menu-item');


exports.contextMenu = function() {

  var cut = new MenuItem({
    label: "Cut",
    accelerator: 'CmdOrCtrl+X',
    click: function () {
      document.execCommand("cut");
    }
  });

  var copy = new MenuItem({
    label: "Copy",
    accelerator: 'CmdOrCtrl+C',
    click: function () {
      document.execCommand("copy");
    }
  })

  var paste = new MenuItem({
    label: "Paste",
    accelerator: 'CmdOrCtrl+V',
    click: function () {
      document.execCommand("paste");
    }
  });

  var selectAll = new MenuItem({
    label: "Select All",
    accelerator: 'CmdOrCtrl+A',
    click: function () {
      document.execCommand("selectAll");
    }
  });

  var textMenu = new Menu();
  textMenu.append(cut);
  textMenu.append(copy);
  textMenu.append(paste);
  textMenu.append(selectAll);

  window.addEventListener('contextmenu', function(e) {
    switch (e.target.nodeName) {
        case 'TEXTAREA':
        case 'PRE':
        case 'SPAN':
            e.preventDefault();
            textMenu.popup(remote.getCurrentWindow());
            break;
    }

  }, false);
}