'use strict';

const css         = require('css'),
      bnnSize     = require('./bnnSize.js'),
      bnnPosition = require('./bnnPosition.js'),
      bnnGradient = require('./bnnGradient.js'),
      bnnImport    = require('./bnnImport.js'),
      bnnAlign    = require('./bnnAlign.js');

function Banana() {

  this.render = (inputPath, stylesheet) => {

    // Create the AST Tree
    let ast = css.parse(stylesheet);

    // Search for import rules
    ast.stylesheet.rules.forEach((rule, index) => {
      // Verifies that the rule is a import
      if (rule.import) {
        // Import the module
        bnnImport(inputPath, rule.import, ast.stylesheet.rules, index);
      }
    });

    // Search for selectors rules
    ast.stylesheet.rules.forEach((rule) => {
      // Verifies that the rule is a selector
      if (rule.selectors) {
        // Get custom declarations and create new declarations
        bnnSize(rule.declarations);
        bnnPosition(rule.declarations);
        bnnGradient(rule.declarations);
        bnnAlign(rule.declarations);
      }
    });

    // Return the stringify AST
    return css.stringify(ast);

  };

}

module.exports = new Banana();
