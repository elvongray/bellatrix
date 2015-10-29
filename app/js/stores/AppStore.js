var AppDispatcher = require('../dispatcher/AppDispatcher');

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var AppStore = assign({}, EventEmitter.prototype, {

  emitLoadGiphys: function() {
    this.emit('load_giphys');
  },

  emitNoConnection: function() {
    this.emit('no_connection');
  },

  emitNoGiphyFound: function() {
    this.emit('no_giphy_found');
  },

  addLoadGiphysListener: function(callback) {
    this.on('load_giphys', callback);
  },

  addNoConnectionListener: function(callback) {
    this.on('no_connection', callback);
  },

  addNoGiphyFoundListener: function(callback) {
    this.on('no_giphy_found', callback);
  },

  getGiphys: function() {
    return giphys;
  }
});

// Register store with dispatcher
AppDispatcher.register(function(action) {

  switch(action.actionType) {
      //what the fuck is this, make it dry!
      case "LOAD_TRENDING_GIPHYS":
        giphys = action.data;
        GiphyStore.emitLoadGiphys();
        break;

      case "LOAD_SEARCHED_GIPHYS":
        giphys = action.data;
        GiphyStore.emitLoadGiphys();
        break;

      case "NO_INTERNET_CONNECTION":
        GiphyStore.emitNoConnection();
        break;

      case "GIPHY_NOT_FOUND":
        GiphyStore.emitNoGiphyFound();
        break;

      default:
        console.log("error");
  }
});

module.exports = AppStore;
