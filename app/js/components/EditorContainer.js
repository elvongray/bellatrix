import React from 'react'

import TextEditorContainer from './TextEditorContainer'
import TerminalContainer from './TerminalContainer'
import MarkdownContainer from './MarkdownContainer'

import '../../css/style.css'

class EditorContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let display;
    // If language is markdown display markdown container
    // else display editor
    if (this.props.language === 'markdown') {
      display = (
        <MarkdownContainer
          editorText={this.props.editorText}/>
      );
    }
    else {
      display = (
        <TerminalContainer
          language={this.props.language}
          editorText={this.props.editorText}/>
      );
    }
    return (
      <div className="mdl-grid mdl-grid--no-spacing editor-container">
        <div className="mdl-cell mdl-cell--6-col text-editor">
          <TextEditorContainer
            theme={this.props.theme}
            language={this.props.language}
            getEditorText={this.props.getEditorText}/>
        </div>
        <div className="mdl-cell mdl-cell--6-col terminal">
          {display}
        </div>
      </div>
    );
  }
}

export default EditorContainer