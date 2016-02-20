const fs = window.require('fs');
const path = window.require("path");
const ipc = window.require('ipc');

import AppDispatcher from '../dispatcher/AppDispatcher'

let dir = `${path.dirname(require.main.filename)}/app/js/stores/`;


const GeneralActions = {

  changeLanguage(langauge) {
    AppDispatcher.dispatch({
      actionType: "CHANGE_LANGUAGE",
      data: langauge
    })
  },

  loadSavedState() {
    // Load the saved state of the editor
    fs.readFile(dir + 'current_state.json', (err, data) => {

      AppDispatcher.dispatch({
        actionType: "LOAD_SAVED_STATE",
        data: JSON.parse(data)
      });
    })
  },

  saveCurrentState(state) {
    // Delete the editorText state, not needed for now
    delete state.editorText;

    // Save the current state of the editor
    fs.writeFile(dir + 'current_state.json', JSON.stringify(state), (err) => {
      if (err) {
        console.log("Error writing into file");
      }
    });
  },

  // send a message to the main process to save the
  // current editor state
  saveEditorText(text, language) {
    ipc.send('save-editor-text', {text: text, language: language});
  },

  loadSavedEditorText(language) {
    ipc.send('load-editor-text', {language: language});
  },

  dispatchLoadedEditorText(data) {
    AppDispatcher.dispatch({
        actionType: "LOAD_SAVED_TEXT",
        data: data
    });
  }
}

export default GeneralActions;
