/**
 * Get custom properties values and add to corresponding var().
 * @module src/core/bnnVariable
 * @param {array} rule - :root rule
 * @param {array} ast - Main CSS AST
 * @param {number} index - :root seletor position in mains AST array
 */

const bnnVariable = (ast, rule, index) => {

  const customVars = [];

  // Save a custom property and values
  rule.findDeclarations((declaration, declarationIndex) => {
    customVars[declarationIndex] = [declaration.property, declaration.value];
  });

  ast.removeRule(index);

  // Find variables and change for custom value
  ast.findAllDeclarations((declaration) => {

    const isVariable = /var\(/.test(declaration.value);

    if(isVariable) {
      customVars.forEach((v, index) => {

        const variableValue = declaration.value
                                              .replace(/var\(/, '')
                                              .replace(/\)/, '');

        const customProperty = customVars[index][0];
        const customValue = customVars[index][1];

        if (variableValue === customProperty) {
          declaration.value = customValue;
        }

      });
    }

  });


};

module.exports = bnnVariable;
