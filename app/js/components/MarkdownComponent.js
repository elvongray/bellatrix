import React from 'react'

import '../../css/markdown.css'

class MarkdownComponent extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header markdown-header">
          <div className="mdl-layout__header-row">
          </div>
        </header>
        <div className="markdown-body"
          dangerouslySetInnerHTML={{__html: this.props.markdown.render(this.props.text)}}>
        </div>
      </div>
    );
  }
}

export default MarkdownComponent
