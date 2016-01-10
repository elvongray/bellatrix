import AppDispatcher from '../dispatcher/AppDispatcher'

import { EventEmitter } from 'events'
import assign from 'object-assign'


var AppStore = assign({}, EventEmitter.prototype, {

  emitChangeLanguage(language) {
    this.emit('change_language', language);
  },

  addChangeLanguageListener(callback) {
    this.on('change_language', callback);
  },

  emitLoadSavedState(data) {
    this.emit('load_saved_state', data);
  },

  addLoadSavedStateListener(callback) {
    this.on('load_saved_state', callback);
  },

  emitLoadSavedText(data) {
    this.emit('load_saved_text', data);
  },

  addLoadSavedTextListener(callback) {
    this.on('load_saved_text', callback);
  },

});

// Register store with dispatcher
AppDispatcher.register(function(action) {

  switch(action.actionType) {

      case "CHANGE_LANGUAGE":
        AppStore.emitChangeLanguage(action.data);
        break;

      case "LOAD_SAVED_STATE":
        AppStore.emitLoadSavedState(action.data);
        break;

      case "LOAD_SAVED_TEXT":
        AppStore.emitLoadSavedText(action.data);
        break;

      default:
        console.log("error");
  }
});

module.exports = AppStore;
