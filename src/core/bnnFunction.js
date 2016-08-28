/**
 * Compile the @function and bnn-function into corresponding properties and arguments.
 * @module src/core/bnnFunction
 * @param {object} rule - @function rule
 * @param {object} ast - Main CSS AST
 * @param {number} index - @function seletor position in main AST.
 */

const bnnFunction = (rule, ast, ruleIndex) => {

  ast.removeRule(ruleIndex);

  const functionDeclarations = [];

  rule.findDeclarations((declaration) => {
    functionDeclarations.push([declaration.property, declaration.value]);
  });

  const functionName = rule.selectors
                                    .toString()
                                    .replace(/\@function /g, '')
                                    .replace(/([\(].*)/g, '');

  const functionArgs = rule.selectors
                                  .toString()
                                  .replace(/(.*[\(])/g, '')
                                  .replace(/\)/g, '')
                                  .replace(/\ /g, '')
                                  .split(',');

  ast.findAllRulesByType('rule', (rule) => {
    rule.findDeclarationsByProperty('bnn-function', (declaration, index) => {

      const callFunctionName = declaration.value.replace(/([\(].*)/g, '');

      const callFunctionArgs = declaration.value
                                              .replace(/(.*[\(])/g, '')
                                              .replace(/\)/g, '')
                                              .replace(/\ /g, '')
                                              .split(',');

      const associateArgs = [];

      for (let i = 0 ; i < functionArgs.length ; i++) {
        associateArgs.push([functionArgs[i],callFunctionArgs[i]]);
      }

      if (callFunctionName === functionName) {

        rule.removeDeclaration(index);

        functionDeclarations.forEach((d, i) => {

          const property = functionDeclarations[i][0];
          let value = functionDeclarations[i][1];

          associateArgs.forEach((associateArg) => {

            const functionArg = associateArg[0];
            const callFunctionArg = associateArg[1];

            if (value === functionArg) {
              value = callFunctionArg;
            }

          });

          rule.addDeclaration(property, value, index);

        });

      }

    });
  });

};

module.exports = bnnFunction;
