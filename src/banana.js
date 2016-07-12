'use strict';

const css = require('css'),
      bnnSize  = require('./bnnSize.js'),
      bnnPosition = require('./bnnPosition.js'),
      bnnGradient = require('./bnnGradient.js');

function Banana() {

  this.render = (stylesheet) => {

    // Create the AST Tree
    let ast = css.parse(stylesheet);

    // Search for rules
    ast.stylesheet.rules.forEach((rule) => {

      // Verifies that the rule is a selector
      if (rule.selectors) {
        // Get custom declarations and create new declarations
        bnnSize(rule.declarations);
        bnnPosition(rule.declarations);
        bnnGradient(rule.declarations);
      }

    });

    // Return the stringify AST
    return css.stringify(ast);

  };

}

module.exports = new Banana();
