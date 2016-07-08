const getParam = require('./getParam');

let replaceProperty = (astTree, customProperty, ...theArg) => {
  let rules = astTree.stylesheet.rules;

  // Search the rule
  for (let key in rules) {
    let rule = rules[key];

    // Search the declaration
    for (let key in rule.declarations) {
      let declaration = rule.declarations[key];

      // Find the customProperty in the tree
      if (declaration.property == customProperty) {

        // Delete custom property
        rule.declarations.splice([key], 1);

        // Add properties and values
        for (let key in theArg) {
          rule.declarations.push({
              type: 'declaration',
              property: theArg[key],
              value: getParam(declaration.value, key)
          });
        }

      }

    }

  }

}

module.exports = replaceProperty;
