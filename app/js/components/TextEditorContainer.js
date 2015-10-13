var React =  require('react');

//initialize ace editor
var aceEditor;

require('../../css/style.css');

var TextEditorContainer = React.createClass({

  changeTheme: function(theme) {
    aceEditor.setTheme("ace/theme/" + theme);
  },

  componentWillReceiveProps: function(nextProps) {
    if(nextProps.theme !== this.props.theme) {
      this.changeTheme(nextProps.theme);
    }
  },

  componentDidMount: function() {
    aceEditor = ace.edit("editor");
    aceEditor.setTheme("ace/theme/" + this.props.theme);
    aceEditor.session.setMode("ace/mode/javascript");
    aceEditor.setShowPrintMargin(false);
  },

  render: function() {

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header text-editor-header">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">Javascript</span>
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
