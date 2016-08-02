var bnnVariable = (rule, mainRules, index) => {

  // Save all custom properties
  // ------------------------------

  let customVars = [];

  // Search for :root declarations
  rule.declarations.forEach((declaration, index) => {
    // Save custom properties
    customVars[index] = new Array(declaration.property, declaration.value);
  });

  // Delete :root
  mainRules.splice(index, 1);


  // Replace all var()
  // ------------------------------

  // Search for all rules
  mainRules.forEach((rule) => {

    // Search for all declarations
    rule.declarations.forEach((declaration) => {

      // verify if the declarations is a var()
      if(/var\(/.test(declaration.value)) {

        // iterates customVars
        customVars.forEach((v, index) => {
          // verify if  var() value == custom property
          if (declaration.value.replace(/var\(/, "").replace(/\)/, "") === customVars[index][0]) {
            // change var() value for custom property
            declaration.value = customVars[index][1];
          }
        });

      }

    });

  });

};

module.exports = bnnVariable;
