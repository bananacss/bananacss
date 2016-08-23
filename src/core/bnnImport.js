const css = require('css');
const addIterations = require('css-ast-iterations');
const fs = require('fs');
const path = require('path');

/**
 * Get a module (@import) and add to mains bnn file (AST).
 * @module src/core/bnnImport
 * @param {string} inputPath - Main file path
 * @param {string} importPath - Module file path
 * @param {array} mainRules - Rules list for a CSS (AST)
 * @param {number} index - @import position in main AST array
 */

const bnnImport = (inputPath, importPath, mainRules, index) => {

  // Delete the import rule
  mainRules.splice(index, 1);

  // Resolve path
  const basePath = path.dirname(inputPath);
  const importPathClean = importPath
                                  .replace(/\"/g, '')
                                  .replace(/\'/g, '');
  const resolvedPath = path.resolve(basePath + '/' + importPathClean);

  // Get the new AST from module
  const bnnModule = fs.readFileSync(resolvedPath, 'utf8');
  const ast = css.parse(bnnModule);
  addIterations(ast);

  // Add new rules on Main AST
  ast.findAllRules((rule) => {
    mainRules.splice(index, 0, rule);
  });

};

module.exports = bnnImport;
