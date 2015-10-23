var ipc = window.require('ipc');

var React = require('react');

//initialize context menu
require('./context_menu').contextMenu();

var TextEditorContainer = require('./components/TextEditorContainer');
var TerminalContainer = require('./components/TerminalContainer');
var MarkdownContainer = require('./components/MarkdownContainer');

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
    var display;
    // If language is markdown display markdown container
    // else display editor
    if (this.state.language === 'markdown') {
      display = (
        <MarkdownContainer
          editorText={this.state.editorText}
        />
      );
    }
    else {
      display = (
        <TerminalContainer
          language={this.state.language}
          editorText={this.state.editorText}
        />
      );
    }
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
          {display}
        </div>
      </div>
    );
  }

});

React.render(<Bellatrix />, document.getElementById('bellatrix'));
