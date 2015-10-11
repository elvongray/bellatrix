var React = require('react');

require('../../css/style.css');

var TerminalContainer = React.createClass({

  componentDidMount: function() {
    var jqconsole = $('#console').jqconsole('Hi\n', '>>>');
    var startPrompt = function () {
      // Start the prompt with history enabled.
      jqconsole.Prompt(true, function (input) {
        // Output input with the class jqconsole-output.
        jqconsole.Write(input + '\n', 'jqconsole-output');
        // Restart the prompt.
        startPrompt();
      });
    };
    startPrompt();
  },

  render: function() {

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header terminal-header">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">Stuffs</span>
          </div>
        </header>
        <div id="console">
        </div>
      </div>
    )
  }
});

module.exports = TerminalContainer;
