var ipc = window.require('ipc');

var React =  require('react');

var GeneralActions = require('../actions/GeneralActions');
var AppStore = require('../stores/AppStore');

//initialize ace editor
var aceEditor;

require('../../css/editor.css');

var TextEditorContainer = React.createClass({

  getInitialState: function() {
    return {
      cursorPosition: {row: 0, column: 0},
      saved: true
    }
  },

  changeTheme: function(theme) {
    aceEditor.setTheme("ace/theme/" + theme);
  },

  changeLanguage: function(language) {
    if (language === 'coffeescript') language = 'coffee';
    aceEditor.session.setMode("ace/mode/" + language);
    aceEditor.setValue("");
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.theme !== this.props.theme) {
      this.changeTheme(nextProps.theme);
    }

    if (nextProps.language !== this.props.language) {
      this.changeLanguage(nextProps.language);
    }

    // Load saved text when a prop change is detected
    if (nextProps.language !== this.props.language){
      GeneralActions.loadSavedEditorText(nextProps.language);
    }

    // Hide the run button if language is markdown
    if(nextProps.language === 'markdown') {
      this.refs.runButton.getDOMNode().classList.add('hide');
    }
    else {
      this.refs.runButton.getDOMNode().classList.remove('hide');
    }
  },

  componentWillMount: function() {
    var self = this;

    // Add listener to load saved text
    AppStore.addLoadSavedTextListener(this.loadSavedText);

    // Listener for saving the editor text
    ipc.on('save-text', function() {
      self.saveEditorText()
    });

    // Listener for executing the code in the editor
    ipc.on('run', function() {
      self.getEditorText()
    });
  },

  componentDidMount: function() {
    this.setUpAceEditor();
    // Trigger event to load saved editor text
    GeneralActions.loadSavedEditorText(this.props.language);
  },

  setUpAceEditor: function() {
    // Set up ace editor
    var self = this;
    aceEditor = ace.edit("editor");
    aceEditor.setTheme("ace/theme/" + this.props.theme);
    aceEditor.session.setMode("ace/mode/" + this.props.language);
    aceEditor.setShowPrintMargin(false);
    aceEditor.getSession().setUseWrapMode(true);
    aceEditor.$blockScrolling = Infinity;

    this.enableLanguageIntellisence();

    aceEditor.getSession().on('change', function(e) {
      self.handleEditorChange(e);

      self.toogleUnSaveIndicator();
    });

    aceEditor.selection.on("changeCursor", function() {
      self.setState({
        cursorPosition: aceEditor.getCursorPosition()
      })
    });
  },

  // Note: intellisence is currently supported for javascript only.
  enableLanguageIntellisence: function() {
    var useWebWorker = window.location.search.toLowerCase().indexOf('noworker');
    aceEditor.getSession().setUseWorker(useWebWorker);

    ace.config.loadModule('ace/ext/tern', function () {
      aceEditor.setOptions({
        enableTern: {
          defs: ['browser', 'ecma5'],
          plugins: {
            doc_comment: {
              fullDocs: true
            }
          },
          useWorker: useWebWorker,
          switchToDoc: function (name, start) {
            console.log('switchToDoc called but not defined. name=' + name + '; start=', start);
          },
          startedCb: function () {
            console.log('editor.ternServer:', aceEditor.ternServer);
          },
        },
        enableBasicAutocompletion: true
      });
    });
  },

  toogleSaveIndicator: function() {
    this.setState({
      saved: true
    });
  },

  toogleUnSaveIndicator: function() {
    this.setState({
      saved: false
    });
  },

  getEditorText: function() {
    this.props.getEditorText(aceEditor.getValue());
  },

  loadSavedText: function(text) {
    aceEditor.setValue(text)
  },

  saveEditorText: function() {
    this.toogleSaveIndicator();
    GeneralActions.saveEditorText(aceEditor.getValue(), this.props.language)
  },

  handleEditorChange: function(event) {
    if(this.props.language === "markdown") {
      this.props.getEditorText(aceEditor.getValue());
    }
  },

  render: function() {
    var color = this.state.saved ? "green" : "red"

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header text-editor-container">
        <header className="mdl-layout__header text-editor-header">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title" >{this.props.language}</span>
            <button className="mdl-button mdl-js-button text-editor-button" onClick={this.saveEditorText}>
              Save
            </button>
            <button
              className="mdl-button mdl-js-button text-editor-button run-button"
              onClick={this.getEditorText}
              ref="runButton">
              Run
              <i className="fa fa-caret-right icon"></i>
            </button>
          </div>
        </header>
        <pre id="editor">
        </pre>
        <footer className="footer">
          <div className={"save-indicator " + color} ></div>
          <div className="cursor-position">
            <span>Line {this.state.cursorPosition.row + 1}, </span>
            <span>Column {this.state.cursorPosition.column + 1}</span>
          </div>
          <div className="editor-theme">Theme: {this.props.theme}</div>
        </footer>
      </div>
    )
  }
});

module.exports = TextEditorContainer;
