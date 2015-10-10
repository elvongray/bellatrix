var React = require('react');

require('../css/style.css');

var Bellatrix = React.createClass({

  render: function() {
    return (
      <div className="mdl-grid mdl-grid--no-spacing editor-container">
        <div className="mdl-cell mdl-cell--6-col text-editor">
        </div>
        <div className="mdl-cell mdl-cell--6-col terminal">
        </div>
      </div>
    );
  }

});

React.render(<Bellatrix />, document.getElementById('bellatrix'));