var ipc = window.require('ipc');

var React = require('react');

var TextEditorContainer = require('./components/TextEditorContainer');
var TerminalContainer = require('./components/TerminalContainer');

require('../css/style.css');

var Bellatrix = React.createClass({

  getInitialState: function() {
    return  {
      theme: 'twilight',
      language: 'javascript',
      editorText: ''
    }
  },

  changeLanguage: function(language) {
    this.setState({
      language: language
    });
  },

  changeEditorTheme: function(theme) {
    this.setState({
      theme: theme
    });
  },

  componentWillMount: function() {
    /*
    * Register event to change theme and language
    * When component is mounted.
    */
    var self = this;
    ipc.on('change-theme', function(theme) {
      self.changeEditorTheme(theme);
    });

    ipc.on('change-language', function(language) {
      self.changeLanguage(language);
    });
  },

  getEditorText: function(text) {
    this.setState({
      editorText: text
    });
  },

  render: function() {
    return (
      <div className="mdl-grid mdl-grid--no-spacing editor-container">
        <div className="mdl-cell mdl-cell--6-col text-editor">
          <TextEditorContainer
            theme={this.state.theme}
            language={this.state.language}
            getEditorText={this.getEditorText}
          />
        </div>
        <div className="mdl-cell mdl-cell--6-col terminal">
          <TerminalContainer
            language={this.state.language}
            editorText={this.state.editorText}
          />
        </div>
      </div>
    );
  }

});

React.render(<Bellatrix />, document.getElementById('bellatrix'));
