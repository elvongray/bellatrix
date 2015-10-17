var React = require('react');

require('../../css/style.css');

 var md;

var MarkdownConatiner = React.createClass({

  getInitialState: function() {
    return {
      text: ""
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if(nextProps.editorText !== this.props.editorText) {
      this.setState({
        text: nextProps.editorText
      })
    }
  },

  componentWillMount: function() {
    md = markdownit({
      html: true,
      linkify: true,
      typographer: true
    });
  },

  render: function() {

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header markdown-header">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title" ></span>
          </div>
        </header>
        <div className="markdown-body"
             dangerouslySetInnerHTML={{__html: md.render(this.state.text)}}>
        </div>
      </div>
    );
  }
});

module.exports = MarkdownConatiner;
