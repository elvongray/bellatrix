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
  },

  componentDidMount: function() {
    var self = this;
    aceEditor = ace.edit("editor");
    aceEditor.setTheme("ace/theme/" + this.props.theme);
    aceEditor.session.setMode("ace/mode/" + this.props.language);
    aceEditor.setShowPrintMargin(false);
    aceEditor.getSession().on('change', function(e) {
      self.handleEditorChange(e);
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
        <main className="mdl-layout__content">
          <div className="page-content">
            <pre id="editor">
            </pre>
          </div>
        </main>
      </div>
    )
  }
});

module.exports = TextEditorContainer;
