var fs = window.require('fs');

var AppDispatcher = require('../dispatcher/AppDispatcher');

var dir = './app/js/stores/';

var GeneralActions = {

  loadSavedState: function() {
    // Load the saved state of the editor
    fs.readFile(dir + 'current_state.json', function(err, data) {

      AppDispatcher.dispatch({
        actionType: "LOAD_SAVED_STATE",
        data: JSON.parse(data)
      });
    })
  },

  saveCurrentState: function(state) {
    // Delete the editorText state, not needed for now
    delete state.editorText;

    // Save the current state of the editor
    fs.writeFile(dir + 'current_state.json', JSON.stringify(state), function(err) {
      if(err) {
        console.log("Error writing into file");
      }
    });
  },

  saveEditorText: function(text, language) {
    fs.writeFile(dir + language + ".txt", text, function(err) {
      if(err) {
        console.log("Error writing into file");
      }
    });
  },

  loadSavedEditorText: function(language) {
    fs.readFile(dir + language + ".txt", 'utf8', function(err, data) {

      AppDispatcher.dispatch({
        actionType: "LOAD_SAVED_TEXT",
        data: data
      });
    })
  }
}

module.exports = GeneralActions;
