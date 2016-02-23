const ipc = window.require('ipc');

import React from 'react'

import GeneralActions from '../actions/GeneralActions'
import AppStore from '../stores/AppStore'
import TextEditorComponent from '../components/TextEditorComponent'


class TextEditorContainer extends React.Component {

  constructor(props) {
    super(props)
    this.aceEditor
    this.state = {
      cursorPosition: {row: 0, column: 0}
    }
    this.currentLanguage = this.props.language
  }

  changeTheme(theme) {
    this.aceEditor.setTheme(`ace/theme/${theme}`);
  }

  changeLanguage(language) {
    if (language === 'coffeescript') language = 'coffee';
    this.aceEditor.session.setMode(`ace/mode/${language}`);
    this.currentLanguage = language;
    this.aceEditor.setValue("");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.theme !== this.props.theme) {
      this.changeTheme(nextProps.theme);
    }

    if (nextProps.language !== this.props.language) {
      this.changeLanguage(nextProps.language);
    }
  }

  componentWillMount() {
    // Add listener to load saved text
    AppStore.addLoadSavedTextListener(this.loadSavedText.bind(this));

    // Listener for executing the code in the editor
    ipc.on('run', () => {
      this.getEditorText()
    });
  }

  componentDidMount() {
    this.setUpAceEditor();
    // Trigger event to load saved editor text
    GeneralActions.loadSavedEditorText(this.props.language);
  }

  setUpAceEditor() {
    // Set up ace editor
    this.aceEditor = ace.edit("editor");
    this.aceEditor.setTheme(`ace/theme/${this.props.theme}`);
    this.aceEditor.session.setMode(`ace/mode/${this.props.language}`);
    this.aceEditor.setShowPrintMargin(false);
    this.aceEditor.getSession().setUseWrapMode(true);
    this.aceEditor.$blockScrolling = Infinity;

    this.enableLanguageIntellisence();

    this.aceEditor.getSession().on('change', (e) => {
      this.handleEditorChange(e);
    });

    this.aceEditor.selection.on("changeCursor", () => {
      this.setState({
        cursorPosition: this.aceEditor.getCursorPosition()
      })
    });
  }

  // Note: intellisence is currently supported for javascript only.
  enableLanguageIntellisence() {
    const useWebWorker = window.location.search.toLowerCase().indexOf('noworker');
    this.aceEditor.getSession().setUseWorker(useWebWorker);

    ace.config.loadModule('ace/ext/tern', () => {
      let self = this
      this.aceEditor.setOptions({
        enableTern: {
          defs: ['browser', 'ecma5'],
          plugins: {
            doc_comment: {
              fullDocs: true
            }
          },
          useWorker: useWebWorker,
          switchToDoc(name, start) {
            console.log('switchToDoc called but not defined. name=' + name + '; start=', start);
          },
          startedCb() {
            console.log('editor.ternServer:', self.aceEditor.ternServer);
          },
        },
        enableBasicAutocompletion: true
      });
    });
  }

  getEditorText() {
    this.props.getEditorText(this.aceEditor.getValue());
  }

  loadSavedText(text) {
    this.aceEditor.setValue(text)
  }

  saveEditorText() {
    GeneralActions.saveEditorText(this.aceEditor.getValue(), this.props.language)
  }

  handleEditorChange(event) {
    if (this.props.language === "markdown") {
      this.props.getEditorText(this.aceEditor.getValue());
    }
    // automatically save text in editor when there is a change
    if (event.data.action == 'insertText' || event.data.action == 'removeText') {
      // ensure the editor text is saved only if the current language is equal to
      // the language passed through the props.
      this.currentLanguage == this.props.language ? this.saveEditorText() : null;
    }
  }

  render() {
    return (
      <TextEditorComponent
        language={this.props.language}
        getEditorText={this.getEditorText.bind(this)}
        cursorPosition={this.state.cursorPosition}
        theme={this.props.theme}/>
    )
  }
}

export default TextEditorContainer;
