const remote = window.require('remote');
const Menu = remote.require('menu');
const MenuItem = remote.require('menu-item');


export function contextMenu() {

  const cut = new MenuItem({
    label: "Cut",
    accelerator: 'CmdOrCtrl+X',
    click: () => {
      document.execCommand("cut");
    }
  });

  const copy = new MenuItem({
    label: "Copy",
    accelerator: 'CmdOrCtrl+C',
    click: () => {
      document.execCommand("copy");
    }
  })

  const paste = new MenuItem({
    label: "Paste",
    accelerator: 'CmdOrCtrl+V',
    click: () => {
      document.execCommand("paste");
    }
  });

  const selectAll = new MenuItem({
    label: "Select All",
    accelerator: 'CmdOrCtrl+A',
    click: () => {
      document.execCommand("selectAll");
    }
  });

  var textMenu = new Menu();
  textMenu.append(cut);
  textMenu.append(copy);
  textMenu.append(paste);
  textMenu.append(selectAll);

  window.addEventListener('contextmenu', (e) => {
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