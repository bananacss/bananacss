const bnnFunction = (rule, ast, index) => {

  ast.removeRule(index);

  // Save the function properties
  const functionProperties = [];

  rule.findDeclarations((declaration) => {
    functionProperties.push([declaration.property, declaration.value]);
  });

  // Get the function name
  const functionName = rule.selectors.toString().replace(/\@function /g, '');

  // Find call for functions and add properties
  ast.findAllRulesByType('rule', (rule) => {
    rule.findDeclarationsByProperty('bnn-function', (declaration, index) => {

      const functionValue = declaration.getParam(0);

      if (functionValue === functionName) {

        rule.removeDeclaration(index);

        functionProperties.forEach((v, i) => {

          const property = functionProperties[i][0];
          const value = functionProperties[i][1];

          rule.addDeclaration(property, value, index);

        });

      }

    });
  });

};

module.exports = bnnFunction;
