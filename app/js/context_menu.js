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

  var textMenu = new Menu();
  textMenu.append(cut);
  textMenu.append(copy);
  textMenu.append(paste);

  document.addEventListener('contextmenu', function(e) {
    console.log(e.target.nodeName);
    switch (e.target.nodeName) {
        case 'TEXTAREA':
        case 'PRE':
            e.preventDefault();
            textMenu.popup(remote.getCurrentWindow());
            break;
    }

  }, false);
}