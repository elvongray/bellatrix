import React from 'react'

import MarkdownComponent from '../components/MarkdownComponent'


class MarkdownContainer extends React.Component{

  constructor(props) {
    super(props)
    this.md;
    this.state = {
      text: ""
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editorText !== this.props.editorText) {
      this.setState({
        text: nextProps.editorText
      })
    }
  }

  componentWillMount() {

    document.addEventListener('click', self.preventLinksFromOpening, false);

    this.md = markdownit({
      html: true,
      linkify: true,
      typographer: true
    });
  }

  // Prevent links from opening in
  // electron app.
  preventLinksFromOpening(e) {

    var checkDomElement = (element) => {
      if (element.nodeName === 'A') {
         e.preventDefault();
      }
    }
    checkDomElement(e.target);
  }

  render() {
    return (
      <MarkdownComponent
        markdown={this.md}
        text={this.state.text}/>
    );
  }
}

export default MarkdownContainer;
