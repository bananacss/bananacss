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
      let propertyValue2 = getParam(declaration.value, 1);

      // Add properties and values
      declarations.push({
        type: 'declaration',
        property: 'display',
        value: "flex"
      });

      declarations.push({
        type: 'declaration',
        property: 'flex-wrap',
        value: "wrap"
      });

      // verify the first value
      if (propertyValue1 === "left") {
        declarations.push({
          type: 'declaration',
          property: 'justify-content',
          value: 'flex-start'
        });
      }

      if (propertyValue1 === "right") {
        declarations.push({
          type: 'declaration',
          property: 'justify-content',
          value: 'flex-end'
        });
      }

      if (propertyValue1 === "center") {
        declarations.push({
          type: 'declaration',
          property: 'justify-content',
          value: propertyValue1
        });
      }

      // verify the property with second value
      if (propertyValue2 === "top") {
        declarations.push({
          type: 'declaration',
          property: 'align-items',
          value: 'flex-start'
        });
      }

      if (propertyValue2 === "bottom") {
        declarations.push({
          type: 'declaration',
          property: 'align-items',
          value: 'flex-end'
        });
      }

      if (propertyValue2 === "center") {
        declarations.push({
          type: 'declaration',
          property: 'align-items',
          value: propertyValue2
        });
      }

    }

  });

};

module.exports = bnnAlign;
