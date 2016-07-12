const getParam = require('./getParam.js');

let bnnPosition = (declarations) => {

  // Search for declarations
  declarations.forEach((declaration, index) => {

    // Find a custom property
    if (declaration.property === "bnn-position") {

      // Delete a custom property
      declarations.splice(index, 1);

      //Filter values
      let propertyValue1 = getParam(declaration.value, 0);
      let propertyValue2 = getParam(declaration.value, 1);
      let propertyValue3 = getParam(declaration.value, 2);
      let propertyValue4 = getParam(declaration.value, 3);

      //verify the property value
      if (propertyValue1 === "center") {

        // Add properties and values
        declarations.push({
          type: 'declaration',
          property: 'display',
          value: "block"
        });

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

      } else {

        // Add properties and values
        declarations.push({
          type: 'declaration',
          property: 'top',
          value: propertyValue1
        });

        declarations.push({
          type: 'declaration',
          property: 'right',
          value: propertyValue2
        });

        declarations.push({
          type: 'declaration',
          property: 'bottom',
          value: propertyValue3
        });

        declarations.push({
          type: 'declaration',
          property: 'left',
          value: propertyValue4
        });

      }

    }

  });

};

module.exports = bnnPosition;
