var React = require('react');

var jqconsole,
    jsrepl;

require('../../css/style.css');

var TerminalContainer = React.createClass({

  getInitialState: function() {
    return  {
      language: 'javascript'
    }
  },

  componentWillMount: function() {

    var inputCallback = function(callback) {
      jqconsole.Input(function(result) {
          callback(result);
      });
    };

    var outputCallback = function(string) {
      jqconsole.Write(string.replace(/\s+/, "") + '\n', 'jqconsole-output');
    };

    var resultCallback = function(string) {
      if(string) {
        jqconsole.Write("=>" + string + '\n', 'jqconsole-output');
      }
    };

    var errorCallback = function(string) {
      jqconsole.Write(string + '\n', 'jqconsole-output');
      console.log("called");
    };

    var progressCallback = function(m, n) {
      console.log(n);
    };

    var timeoutCallback = function() {
      console.log("timedout");
      return true
    };

    jsrepl = new JSREPL({
      input: inputCallback,
      output: outputCallback,
      result: resultCallback,
      error: errorCallback,
      progress: progressCallback,
      timeout: {
        time: 30000,
        callback: timeoutCallback
      }
    });
  },

  componentDidMount: function() {
    jsrepl.loadLanguage(this.state.language, function () {

      jqconsole = $('#console').jqconsole('Hi\n', '>');
      var startPrompt = function () {
        // Start the prompt with history enabled.
        jqconsole.Prompt(true, function (input) {
          // Output input with the class jqconsole-output.
          jsrepl.eval(input)
          // Restart the prompt.
          startPrompt();
        });
      };
      startPrompt();
      jqconsole.Write('Javascript loaded...\n', 'jqconsole-output');
    });
  },

  render: function() {

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header terminal-header">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">clear</span>
          </div>
        </header>
        <div id="console">
        </div>
      </div>
    )
  }
});

module.exports = TerminalContainer;
