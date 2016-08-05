const css = require('css');
const fs = require('fs');
const path = require('path');

const bnnImport = (inputPath, importPath, mainRules, index) => {

  // Delete the import rule
  mainRules.splice(index, 1);

  // Resolve path
  const basePath = path.dirname(inputPath);
  const resolvedPath = path.resolve(basePath + '/' + importPath);

  const bnnModule = fs.readFileSync(resolvedPath, 'utf8');
  const ast = css.parse(bnnModule);

  // Add module rules to mainsRules
  ast.stylesheet.rules.forEach((rule) => {
    mainRules.unshift(rule);
  });

};

module.exports = bnnImport;
