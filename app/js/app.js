var React = require('react');

var TextEditorContainer = require('./components/TextEditorContainer');

require('../css/style.css');

var Bellatrix = React.createClass({

  render: function() {
    return (
      <div className="mdl-grid mdl-grid--no-spacing editor-container">
        <div className="mdl-cell mdl-cell--6-col text-editor">
          <TextEditorContainer />
        </div>
        <div className="mdl-cell mdl-cell--6-col terminal">
        </div>
      </div>
    );
  }

});

React.render(<Bellatrix />, document.getElementById('bellatrix'));