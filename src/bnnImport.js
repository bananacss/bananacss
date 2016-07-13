const css  = require('css'),
      fs   = require('fs'),
      path = require('path');

var bnnImport = (inputPath, importPath, mainRules, index) => {

  // Delete the import rule
  mainRules.splice(index, 1);

  // Resolve path
  let basePath = path.dirname(inputPath);
  let resolvedPath = path.resolve(basePath+'/'+importPath);

  // Read and create the AST
  let bnnModule = fs.readFileSync(resolvedPath, 'utf8');
  let ast = css.parse(bnnModule);

  // Add module rules to mainsRules
  ast.stylesheet.rules.forEach((rule) => {
    mainRules.push(rule);
  });

};

module.exports = bnnImport;
