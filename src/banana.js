'use strict';

const css = require('css');

/**
 * Get config for dependecies injectio and run all bnn modules
 * @module src/banana
 * @param {object} config - Modules for dependecies injection
 */
const Banana = (config) => {

  /**
   * Iteration in AST and run all modules
   * @method render
   * @param {string} inputPath - input file path
   * @param {array} stylesheet - AST stylesheet
   */
  return {
    render: (inputPath, stylesheet) => {

      const ast = css.parse(stylesheet);
      const rules = ast.stylesheet.rules;

      // Search for all the @import and generate a single AST
      rules.forEach((rule, index) => {
        if (rule.import) {
          if (config.bnnImport) {
            const bnnImport = require('../src/core/bnnImport.js');
            bnnImport(inputPath, rule.import, rules, index);
          }
        }
      });

      // Search for all global variables and compile
      rules.forEach((rule, index) => {
        if ('' + rule.selectors === ':root') {
          if (config.bnnVariable) {
            require('../src/core/bnnVariable.js')(rule, rules, index);
          }
        }
      });

      // Search for all banana properties and compile
      rules.forEach((rule) => {
        if (rule.selectors) {

          if (config.bnnSize) {
            require('../src/core/bnnSize.js')(rule.declarations);
          }

          if (config.bnnPosition) {
            require('../src/core/bnnPosition.js')(rule.declarations);
          }

          if (config.bnnGradient) {
            require('../src/core/bnnGradient.js')(rule.declarations);
          }

          if (config.bnnAlign) {
            require('../src/core/bnnAlign.js')(rule.declarations);
          }

          if (config.bnnWidth) {
            require('../src/core/bnnWidth.js')(rule.declarations);
          }

          if (config.bnnHeight) {
            require('../src/core/bnnHeight.js')(rule.declarations);
          }

        }
      });

      return css.stringify(ast, {compress: config.compress});

    }
  };

};

module.exports = Banana;
