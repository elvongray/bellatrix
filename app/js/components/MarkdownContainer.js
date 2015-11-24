var React = require('react');

require('../../css/markdown.css');

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
    var self = this;

    document.addEventListener('click', self.preventLinksFromOpening, false);

    md = markdownit({
      html: true,
      linkify: true,
      typographer: true
    });
  },

  // Prevent links from opening in
  // electron app.
  preventLinksFromOpening: function(e) {

    var checkDomElement = function (element) {
      if (element.nodeName === 'A') {
         e.preventDefault();
      }
    }
    checkDomElement(e.target);
  },

  render: function() {

    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header markdown-header">
          <div className="mdl-layout__header-row">
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
