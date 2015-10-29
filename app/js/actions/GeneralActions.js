var AppDispatcher = require('../dispatcher/AppDispatcher');

var GeneralActions = {

  loadSavedState: function() {
    AppDispatcher.dispatch({
      actionType: "LOAD_SAVED_STATE",
    });
  }

}

module.exports = GeneralActions;
