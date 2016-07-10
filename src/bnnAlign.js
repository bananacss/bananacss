const getParam = require('./getParam.js');

let bnnAlign = (declarations) => {

  // Search for declarations
  declarations.forEach((declaration, index) => {

    // Find a custom property
    if (declaration.property === "bnn-align") {

      // Delete a custom property
      declarations.splice(index, 1);

      //Filter values
      let propertyValue1 = getParam(declaration.value, 0);

      //verify the property value
      if (propertyValue1 === "center") {

        // Add properties and values
        declarations.push({
          type: 'declaration',
          property: 'margin-left',
          value: "auto"
        });

        declarations.push({
          type: 'declaration',
          property: 'margin-right',
          value: "auto"
        });

      }

    }

  });

};

module.exports = bnnAlign;
