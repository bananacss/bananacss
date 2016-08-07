'use strict';

const css = require('css');

const Banana = (config) => {

  return {
    render: (inputPath, stylesheet) => {

      const ast = css.parse(stylesheet);
      const rules = ast.stylesheet.rules;

      // Search for all the @import and generate a single AST
      rules.forEach((rule, index) => {
        if (rule.import) {
          config.bnnImport(inputPath, rule.import, rules, index);
        }
      });

      // Search for all global variables and compile
      rules.forEach((rule, index) => {
        if ('' + rule.selectors === ':root') {
          config.bnnVariable(rule, rules, index);
        }
      });

      // Search for all custom properties and compile
      rules.forEach((rule) => {
        if (rule.selectors) {
          config.bnnSize(rule.declarations);
          config.bnnPosition(rule.declarations);
          config.bnnGradient(rule.declarations);
          config.bnnAlign(rule.declarations);
          config.bnnWidth(rule.declarations);
          config.bnnHeight(rule.declarations);
        }
      });

      return css.stringify(ast);

    }
  };

};

module.exports = Banana;
