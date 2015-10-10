var React =  require('react');

//initialize ace editor
var aceEditor;

require('../../css/style.css');

var TextEditorContainer = React.createClass({

  componentDidMount: function() {
    var aceEditor = ace.edit("editor");
    aceEditor.setTheme("ace/theme/twilight");
    aceEditor.session.setMode("ace/mode/javascript");
  },

  render: function() {
    return (
      <div>
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
      </div>
    )
  }
});

module.exports = TextEditorContainer;
