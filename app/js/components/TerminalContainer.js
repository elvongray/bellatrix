import React from 'react'

import TerminalComponent from './TerminalComponent'

import {languageSpec} from '../lang_config/language'


class TerminalContainer extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      showSpinner: true
    }
    this.jqconsole
    this.jsrepl
  }

  componentWillReceiveProps(nextProps) {
    // Check whether the language prop has changed
    // to load the new language
    if (this.props.language !== nextProps.language) {
      $('#console').empty();
      this.toggleSpinner()
      this.loadLanguage(nextProps.language);
    }

    // Retrieve code in editor
    if (nextProps.editorText) {
      this.evaluateCode(nextProps.editorText)
    }
  }

  componentWillMount() {

    const inputCallback = (callback) => {
      this.jqconsole.Input((result) => {
          callback(result);
      });
    };

    const outputCallback = (string) => {
      this.jqconsole.Write(`${string.trimRight()}\n`, 'jqconsole-output');
    };

    const resultCallback = (string) => {
      if (string) {
        this.jqconsole.Write(`=> ${string}\n`, 'jqconsole-output');
      }
    };

    const errorCallback = (string) => {
      this.jqconsole.Write(`${string}\n`, 'jqconsole-error');
    };

    const progressCallback = (m, n) => {
      // Will use later ¯\_(ツ)_/¯
    };

    const timeoutCallback = () => {
      this.loadLanguage(this.props.language);
      return true
    };

    this.jsrepl = new JSREPL({
      input: inputCallback,
      output: outputCallback,
      result: resultCallback,
      error: errorCallback,
      progress: progressCallback,
      timeout: {
        time: 12000,
        callback: timeoutCallback
      }
    });
  }

  registerShortcuts() {
    // Ctrl+A: Move terminal to the start.
    this.jqconsole.RegisterShortcut('A', () => this.MoveToStart() );

    // Ctrl+E: Move terminal to the end.
    this.jqconsole.RegisterShortcut('E', () => this.MoveToEnd() );

    // Ctrl+K: Clear terminal.
    this.jqconsole.RegisterShortcut('K', () => this.Clear() );
  }

  componentDidMount() {
    this.loadLanguage(this.props.language);
  }

  startPrompt() {
    // Start the prompt with history enabled.
    this.jqconsole.Prompt(true, (input) => {
      // Output input with the class jqconsole-output.
      this.jsrepl.eval(input)
      // Restart the prompt.
      this.startPrompt();
    }, this.jsrepl.checkLineEnd, true);
  }

  loadLanguage(language) {
    this.jsrepl.loadLanguage(language, () => {
      this.toggleSpinner()
      this.jqconsole = $('#console').jqconsole(`${languageSpec(language)}\n`, '>>> ', '...');
      this.registerShortcuts();
      this.startPrompt();
    });
  }

  evaluateCode(code) {
    this.jqconsole.AbortPrompt();
    this.jsrepl.eval(code);
    this.startPrompt();
  }

  clearTerminal() {
    this.jqconsole.Clear();
  }

  toggleSpinner() {
    if (this.state.showSpinner) {
      this.setState({
        showSpinner: false
      });
      return;
    }
    this.setState({
      showSpinner: true
    });
  }

  render() {
    return (
      <TerminalComponent
        clearTerminal={this.clearTerminal}
        showSpinner={this.state.showSpinner}/>
    )
  }
}

export default TerminalContainer
