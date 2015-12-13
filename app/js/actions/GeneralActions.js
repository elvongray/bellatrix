const fs = window.require('fs');

import AppDispatcher from '../dispatcher/AppDispatcher'

let dir = './app/js/stores/'

const GeneralActions = {

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

  saveEditorText(text, language) {
    fs.writeFile(`${dir}${language}.txt`, text, (err) => {
      if(err) {
        console.log("Error writing into file");
      }
    });
  },

  loadSavedEditorText(language) {
    fs.readFile(`${dir}${language}.txt`, 'utf8', (err, data) => {

      AppDispatcher.dispatch({
        actionType: "LOAD_SAVED_TEXT",
        data: data
      });
    })
  }
}

export default GeneralActions;
