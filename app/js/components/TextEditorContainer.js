var React =  require('react');

//initialize ace editor
var aceEditor;

require('../../css/style.css');

var TextEditorContainer = React.createClass({

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

    this.componentDidMount();
  },

  componentDidMount: function() {
    var self = this;
    ace.require("ace/ext/language_tools");
    aceEditor = ace.edit("editor");
    aceEditor.setTheme("ace/theme/" + this.props.theme);
    aceEditor.session.setMode("ace/mode/" + this.props.language);
    aceEditor.setShowPrintMargin(false);
    aceEditor.getSession().setUseWrapMode(true);
    aceEditor.$blockScrolling = Infinity;

    if(this.props.language == 'javascript') {
      this.enableJavascriptIntellisence();
    }
    else {
      aceEditor.setOptions({
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true
      });
    }
    console.log(this.props.language);
    aceEditor.getSession().on('change', function(e) {
      self.handleEditorChange(e);
    });
  },

  // Note: intellisence is currently supported for javascipt only.
  enableJavascriptIntellisence: function() {
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
        enableBasicAutocompletion: true,
      });
    });
  },

  getEditorText: function() {
    this.props.getEditorText(aceEditor.getValue());
  },

  handleEditorChange: function(event) {
    if(this.props.language === "markdown") {
      this.props.getEditorText(aceEditor.getValue());
    }
  },

  render: function() {

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header text-editor-header">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title" >{this.props.language}</span>
            <button className="mdl-button mdl-js-button" onClick={this.getEditorText}>
              Run
            </button>
          </div>
        </header>
          <pre id="editor">
          </pre>
      </div>
    )
  }
});

module.exports = TextEditorContainer;
