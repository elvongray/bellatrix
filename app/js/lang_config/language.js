/**
* Note: this module contains info about the currently specified language.
* The current implementation hard codes the version of the language been used,
* this will change in later implemetations.
*/

export function languageSpec(language) {

  switch(language) {
      case 'javascript':
        return handleJavascript();
        break;

      case 'ruby':
        return handleRuby();
        break;

      case 'coffeescript':
        return handleCoffeeScript()
        break;
  }

  function handleJavascript() {
    return "Native Chrome JavaScript.\n" +
            "Copyright (c) 2015 Google Inc"
  }

  function handleRuby() {
    return "Ruby 1.8.7 (2008-05-31 patchlevel 0) [x86-linux]\n" +
           "[GCC 4.2.1 (LLVM, Emscripten 1.5, Emscripted-Ruby)]"
  }

  function handleCoffeeScript() {
    return "CoffeeScript v1.3.1\n" +
           "Copyright (c) 2011, Jeremy Ashkenas"
  }
}
