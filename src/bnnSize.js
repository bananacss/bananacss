const getParam = require('./getParam.js');

let bnnSize = (declarations) => {

  // Search for declarations
  declarations.forEach((declaration, index) => {

    // Find the custom property
    if (declaration.property === "bnn-size") {

      // Delete a custom property
      declarations.splice(index, 1);

      //Filter values
      let propertyValue1 = getParam(declaration.value, 0);
      let propertyValue2 = getParam(declaration.value, 1);

      // Add properties and values
      declarations.push({
        type: 'declaration',
        property: 'width',
        value: propertyValue1
      });

      declarations.push({
        type: 'declaration',
        property: 'height',
        value: propertyValue2
      });

    }

  });

};


module.exports = bnnSize;
