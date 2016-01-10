import React from 'react'

import DropdownComponent from './DropdownComponent'

import GeneralActions from '../actions/GeneralActions'

import '../../css/editor.css'

class TextEditorComponent extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    // Hide the run button if language is markdown
    if (nextProps.language === 'markdown') {
      this.refs.runButton.classList.add('hide');
    } else {
      this.refs.runButton.classList.remove('hide');
    }
  }

  changeLanguage(language) {
    GeneralActions.changeLanguage(language.toLowerCase())
  }

  unslugify(string) {
    return string.replace(/_/g, " ").replace(/\b[a-z]/g, function() {
        return arguments[0].toUpperCase();
    });
  }

  render() {
    let languages = [
      'JAVASCRIPT',
      'RUBY',
      'COFFEESCRIPT',
      'MARKDOWN'
    ]

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header text-editor-container">
        {/* TODO: This header should be a component */}
        <header className="mdl-layout__header text-editor-header">
          <div className="mdl-layout__header-row">
            <DropdownComponent
              changeLanguage={this.changeLanguage.bind(this)}
              languages={languages}
              language={this.props.language}/>
            <button
              className="mdl-button mdl-js-button text-editor-button run-button"
              onClick={this.props.getEditorText}
              ref="runButton">
              Run
              <i className="fa fa-caret-right icon"></i>
            </button>
          </div>
        </header>
        <div id="editor">
        </div>
       {/* TODO: This footer should be a component */}
        <footer className="footer">
          <div className="cursor-position">
            <span>Line {this.props.cursorPosition.row + 1}, </span>
            <span>Column {this.props.cursorPosition.column + 1}</span>
          </div>
          <div className="editor-theme">Theme: {this.unslugify(this.props.theme)}</div>
        </footer>
      </div>
    )
  }
}

export default TextEditorComponent