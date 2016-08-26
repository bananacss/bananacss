const css = require('css');
const addIterations = require('css-ast-iterations');
const fs = require('fs');
const path = require('path');

/**
 * Get a module (@import) and add to mains bnn file (AST).
 * @module src/core/bnnImport
 * @param {string} importPath - Module file path
 * @param {object} ast - Rules list for a CSS (AST)
 * @param {number} index - @import position in main AST array
 * @param {string} inputPath - Main file path
 */

const bnnImport = (importPath, ast, index, inputPath) => {

  // Delete the import rule
  ast.removeRule(index);

  // Resolve path
  const basePath = path.dirname(inputPath);
  const importPathClean = importPath
                                  .replace(/\"/g, '')
                                  .replace(/\'/g, '');
  const resolvedPath = path.resolve(basePath + '/' + importPathClean);

  // Get the new AST from module
  const bnnModule = fs.readFileSync(resolvedPath, 'utf8');
  const astModule = css.parse(bnnModule);
  addIterations(astModule);

  // Add new rules on Main AST
  astModule.findAllRules((rule) => {
    ast.addRule(rule, index);
  });

};

module.exports = bnnImport;
