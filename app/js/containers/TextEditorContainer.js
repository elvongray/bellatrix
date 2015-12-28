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
      cursorPosition: {row: 0, column: 0},
      saved: true
    }
  }

  changeTheme(theme) {
    this.aceEditor.setTheme(`ace/theme/${theme}`);
  }

  changeLanguage(language) {
    if (language === 'coffeescript') language = 'coffee';
    this.aceEditor.session.setMode(`ace/mode/${language}`);
    this.aceEditor.setValue("");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.theme !== this.props.theme) {
      this.changeTheme(nextProps.theme);
    }

    if (nextProps.language !== this.props.language) {
      this.changeLanguage(nextProps.language);
    }

    // Load saved text when a prop change is detected
    if (nextProps.language !== this.props.language){
      GeneralActions.loadSavedEditorText(nextProps.language);
    }
  }

  componentWillMount() {
    // Add listener to load saved text
    AppStore.addLoadSavedTextListener(this.loadSavedText.bind(this));

    // Listener for saving the editor text
    ipc.on('save-text', () => {
      this.saveEditorText()
    });

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

      this.toogleUnSaveIndicator();
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

  toogleSaveIndicator() {
    this.setState({
      saved: true
    });
  }

  toogleUnSaveIndicator() {
    this.setState({
      saved: false
    });
  }

  getEditorText() {
    this.props.getEditorText(this.aceEditor.getValue());
  }

  loadSavedText(text) {
    this.aceEditor.setValue(text)
  }

  saveEditorText() {
    this.toogleSaveIndicator();
    GeneralActions.saveEditorText(this.aceEditor.getValue(), this.props.language)
  }

  handleEditorChange(event) {
    if (this.props.language === "markdown") {
      this.props.getEditorText(this.aceEditor.getValue());
    }
  }

  render() {
    return (
      <TextEditorComponent
        language={this.props.language}
        saveEditorText={this.saveEditorText.bind(this)}
        getEditorText={this.getEditorText.bind(this)}
        cursorPosition={this.state.cursorPosition}
        theme={this.props.theme}
        saved={this.state.saved}/>
    )
  }
}

export default TextEditorContainer;
