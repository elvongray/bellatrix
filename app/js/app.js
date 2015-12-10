// TODO: Solve this issue
const ipc = window.require('ipc');

import React from 'react'

import { contextMenu } from './context_menu'

import GeneralActions from './actions/GeneralActions'
import AppStore from './stores/AppStore'

import EditorContainer from './components/EditorContainer'
console.log(EditorContainer);

class Bellatrix extends React.Component{

  constructor() {
    super();
    this.state = {
      theme: 'twilight',
      language: 'javascript',
      editorText: ''
    }
  }

  changeLanguage(language) {
    GeneralActions.loadSavedEditorText(language);
    this.setState({
      language: language
    });
  }

  changeEditorTheme(theme) {
    this.setState({
      theme: theme
    });
  }

  componentWillMount() {
    /*
    * Register event to change theme and language
    * When component is mounted.
    */

    //initialize context menu
    contextMenu()

    ipc.on('change-theme', (theme) => {
      this.changeEditorTheme(theme);
      GeneralActions.saveCurrentState(this.state);
    });

    ipc.on('change-language', (language) => {
      this.changeLanguage(language);
      GeneralActions.saveCurrentState(this.state);
    });

    // Register method for loading saved state
    AppStore.addLoadSavedStateListener(this.loadSavedState.bind(this));
  }

  componentDidMount() {
    // trigger action to load the saved state
    GeneralActions.loadSavedState()
  }

  getEditorText(text) {
    this.setState({
      editorText: text
    });
  }

  loadSavedState(state) {
    this.setState(state);
  }

  render() {
    <EditorContainer
      language={this.state.language}
      editorText={this.state.editorText}
      theme={this.state.theme}
      getEditorText={this.getEditorText}/>
  }

}

React.render(<Bellatrix />, document.getElementById('bellatrix'));
