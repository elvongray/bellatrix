var fs = window.require('fs');

var AppDispatcher = require('../dispatcher/AppDispatcher');

var GeneralActions = {

  loadSavedState: function() {
    fs.readFile('current_state.json', function(err, data) {

      AppDispatcher.dispatch({
        actionType: "LOAD_SAVED_STATE",
        data: JSON.parse(data)
      });
    })
  },

  saveCurrentState: function(state) {
    delete state.editorText;

    fs.writeFile('current_state.json', JSON.stringify(state), function(err) {
      if(err) {
        console.log("Error writing into file");
      }
    });
  }
}

module.exports = GeneralActions;
