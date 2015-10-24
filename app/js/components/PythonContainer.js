/*
* Note: This component will be removed ones
* The issue with jsrepl is resolved. The
* terminal conatiner imitated here, this will be changed
* ones the jsrepl issue is resolved
*/
var React = require('react');

var pythonRepl = empython;
console.log(pythonRepl);

var PythonContainer = React.createClass({

  componentDidMount: function() {
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
