'use strict';

const css = require('css');
const addIterations = require('css-ast-iterations');

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

      // Add all methods for itarate on AST (before import modules)
      addIterations(ast);

      // Search for all the @import and generate a single AST
      ast.findAllRulesByType('import', (rule, index) => {
        if (config.bnnImport) {
          const bnnImport = require('../src/core/bnnImport.js');
          bnnImport(inputPath, rule.import, ast.stylesheet.rules, index);
        }
      });

      // Add all methods for itarate on AST (after import modules)
      addIterations(ast);

      // Search for all global variables and compile
      ast.findAllRulesBySelectors(':root', (rule, index) => {
        if (config.bnnVariable) {
          require('../src/core/bnnVariable.js')(ast, rule, index);
        }
      });

      // Search for all banana properties and compile
      ast.findAllRulesByType('rule', (rule) => {

        if (config.bnnSize) {
          require('../src/core/bnnSize.js')(rule);
        }

        if (config.bnnPosition) {
          require('../src/core/bnnPosition.js')(rule);
        }

        if (config.bnnGradient) {
          require('../src/core/bnnGradient.js')(rule);
        }

        if (config.bnnAlign) {
          require('../src/core/bnnAlign.js')(rule);
        }

        if (config.bnnWidth) {
          require('../src/core/bnnWidth.js')(rule);
        }

        if (config.bnnHeight) {
          require('../src/core/bnnHeight.js')(rule);
        }

        if (config.bnnCol) {
          require('../src/core/bnnCol.js')(rule);
        }

        if (config.bnnRow) {
          require('../src/core/bnnRow.js')(rule);
        }

        if (config.bnnBox) {
          require('../src/core/bnnBox.js')(rule);
        }

      });

      return css.stringify(ast, {compress: config.compress});

    }
  };

};

module.exports = Banana;
