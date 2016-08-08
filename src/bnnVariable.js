/**
 * Get custom properties values and add to corresponding var().
 * @module src/bnnVariable
 * @param {array} rule - :root rule
 * @param {array} mainRule - Rules list for a CSS (AST)
 * @param {number} index - :root seletor position in mains AST array
 */
const bnnVariable = (rule, mainRules, index) => {

  const customVars = [];

  rule.declarations.forEach((declaration, index) => {
    // Save a custom property and values
    customVars[index] = [declaration.property, declaration.value];
  });

  // Delete the :root selector
  mainRules.splice(index, 1);

  // Find variables ans change for custom value
  mainRules.forEach((rule) => {
    rule.declarations.forEach((declaration) => {

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
  });

};

module.exports = bnnVariable;
