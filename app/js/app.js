var ipc = window.require('ipc');

var React = require('react');

var TextEditorContainer = require('./components/TextEditorContainer');
var TerminalContainer = require('./components/TerminalContainer');

require('../css/style.css');

var Bellatrix = React.createClass({

  getInitialState: function() {
    return  {
      theme: 'twilight',
      language: 'javascript'
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
    var self = this;
    ipc.on('change-theme', function(theme) {
      self.changeEditorTheme(theme);
    });

    ipc.on('change-language', function(language) {
      self.changeLanguage(language);
    });
  },

  render: function() {
    return (
      <div className="mdl-grid mdl-grid--no-spacing editor-container">
        <div className="mdl-cell mdl-cell--6-col text-editor">
          <TextEditorContainer
            theme={this.state.theme}
            language={this.state.language}
          />
        </div>
        <div className="mdl-cell mdl-cell--6-col terminal">
          <TerminalContainer />
        </div>
      </div>
    );
  }

});

React.render(<Bellatrix />, document.getElementById('bellatrix'));
