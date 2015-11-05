/*
* This file will contain the languages config for handling
* multiline input in the terminal for base languages
*/

exports.languageMultilineHandler = function(language, command) {

  switch(language) {
      case 'javascript':
        return handleJavascript(command);
        break;

      case 'ruby':
        return handleRuby(command);
        break;

      case 'coffeescript':
        return handleCoffeeScript(command)
        break;
   }

  function handleJavascript(command) {
      try {
        eval(command);
        return false;
      } catch (error) {
        if (/[\[\{\(]$/.test(command)) {
          return 1;
        } else {
          return 0;
        }
      }
  }

  function handleRuby(command) {
    var braces, brackets, i, j, last_line_changes, len,
        len1, levels, line, parens, ref, ref1, token;

    var BLOCK_OPENERS = ["begin", "module", "def", "class", "if", "unless", "case", "for", "while", "until", "do"];

    var TOKENS = /\s+|\d+(?:\.\d*)?|"(?:[^"]|\\.)*"|'(?:[^']|\\.)*'|\/(?:[^\/]|\\.)*\/|[-+\/*]|[<>=]=?|:?[a-z@$][\w?!]*|[{}()\[\]]|[^\w\s]+/ig;

    var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

    levels = 0;
    parens = 0;
    braces = 0;
    brackets = 0;
    last_line_changes = 0;
    ref = command.split('\n');
    for (i = 0, len = ref.length; i < len; i++) {
      line = ref[i];
      last_line_changes = 0;
      ref1 = line.match(TOKENS) || [];
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        token = ref1[j];
        if (indexOf.call(BLOCK_OPENERS, token) >= 0) {
          levels++;
          last_line_changes++;
        } else if (token === '(') {
          parens++;
          last_line_changes++;
        } else if (token === '{') {
          braces++;
          last_line_changes++;
        } else if (token === '[') {
          brackets++;
          last_line_changes++;
        } else if (token === 'end') {
          levels--;
          last_line_changes--;
        } else if (token === ')') {
          parens--;
          last_line_changes--;
        } else if (token === ']') {
          braces--;
          last_line_changes--;
        } else if (token === '}') {
          brackets--;
          last_line_changes--;
        }
        if (levels < 0 || parens < 0 || braces < 0 || brackets < 0) {
          return false;
        }
      }
    }
    if (levels > 0 || parens > 0 || braces > 0 || brackets > 0) {
      if (last_line_changes > 0) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return false;
    }
  }

  function handleCoffeeScript(command) {
    return false;
  }
}
