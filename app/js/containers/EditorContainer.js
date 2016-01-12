import React from 'react'
import ReactDOM from 'react-dom'

import Draggable from 'react-draggable'

import TextEditorContainer from './TextEditorContainer'
import TerminalContainer from './TerminalContainer'
import MarkdownContainer from './MarkdownContainer'

import '../../css/style.css'

class EditorContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0
    }
    this.handleDrag = this.handleDrag.bind(this)
    this.handleResize = this.handleResize.bind(this)
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentDidMount() {
    this.terminalDomNode = ReactDOM.findDOMNode(this.refs.terminal)
    this.editorDomNode = ReactDOM.findDOMNode(this.refs.editor)
    this.draggable = ReactDOM.findDOMNode(this.refs.draggable)
    console.log(this.draggable.style)
  }

  handleResize() {
    let eW = this.editorDomNode.offsetWidth
    let tW = this.terminalDomNode.offsetWidth
    let calcNewWidthE = Math.floor((window.innerWidth + (eW - tW)) / 2)
    let calcNewWidthT = Math.floor((window.innerWidth - (eW - tW)) / 2)
    this.draggable.style.left = `${calcNewWidthE}px`
    this.editorDomNode.style.width = `${calcNewWidthE}px`
    this.terminalDomNode.style.width = `${calcNewWidthT}px`
    this.draggable.style.webkitTransform = 'translate(0px, 0px)'
    this.draggable.style.transform = 'translate(0px, 0px)'
  }

  handleDrag(event, ui) {
    this.terminalDomNode.style.width = `${this.terminalDomNode.offsetWidth - ui.deltaX}px`
    this.editorDomNode.style.width = `${this.editorDomNode.offsetWidth + ui.deltaX}px`
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
        <div ref="editor" className="mdl-cell mdl-cell--6-col text-editor">
          <TextEditorContainer
            theme={this.props.theme}
            language={this.props.language}
            getEditorText={this.props.getEditorText}/>
        </div>
        <Draggable
            onMouseDown={this.handleMouseDown}
            onDrag={this.handleDrag}
            axis="x">
            <div ref="draggable" className="draggable-div"></div>
        </Draggable>
        <div ref="terminal" className="mdl-cell mdl-cell--6-col terminal">
          {display}
        </div>
      </div>
    );
  }
}

export default EditorContainer