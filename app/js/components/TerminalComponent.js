import React from 'react'

import '../../css/terminal.css'

class TerminalComponent extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    let showSpinner = this.props.showSpinner ? '' : 'none'

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header terminal-header">
          <div className="mdl-layout__header-row">
            <button className="mdl-button mdl-js-button terminal-editor-button" onClick={this.clearTerminal}>
              clear
            </button>
          </div>
        </header>
        <div className={"load7"} style={{display: showSpinner}}>
          <div className="loader">Loading...</div>
        </div>
        <div id="console">
        </div>
        <footer className="mdl-mini-footer mdl-cell mdl-cell--12-col footer">
          <div className="mdl-mini-footer__left-section">
          </div>
        </footer>
      </div>
    )
  }
}

export default TerminalComponent
