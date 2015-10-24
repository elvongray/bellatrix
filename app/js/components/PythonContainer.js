/*
* Note: This component will be removed ones
* The issue with jsrepl is resolved. The
* terminal conatiner imitated here, this will be changed
* ones the jsrepl issue is resolved
*/
var React = require('react');

// Note this are initiated from the global
// window in index.html
var pythonRepl = empython,
    jqconsole;


var PythonContainer = React.createClass({

  componentDidMount: function() {
    this.loadLanguage(this.props.language);
  },

  resultOutput: function(value) {
    console.log("asasa")
    jqconsole.Write(value + '\n', 'jqconsole-output');
  },

  loadLanguage: function(language) {
    pythonRepl.Initialize();
    // Override default printing
    pythonRepl.Module.print = pythonRepl.Module.printErr = this.resultOutput;
    jqconsole = $('#console').jqconsole('python loaded...\n', '>');
    this.startPrompt();
  },

  startPrompt: function() {
    // Start the prompt with history enabled.
    var self = this;
    jqconsole.Prompt(true, function (input) {
      // Output input with the class jqconsole-output.
      pythonRepl.Run(input);
      // Restart the prompt.
      self.startPrompt();
    });
  },

  clearTerminal: function() {
    jqconsole.Clear();
  },

  render: function() {

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header terminal-header">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title" onClick={this.clearTerminal}>clear</span>
          </div>
        </header>
        <div id="console">
        </div>
      </div>
    )
  }
});

module.exports = PythonContainer;
