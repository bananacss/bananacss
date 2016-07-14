const getParam = require('./getParam.js');

let bnnAlign = (declarations) => {

  // Search for declarations
  declarations.forEach((declaration, index) => {

    // Find a custom property
    if (declaration.property === "bnn-align") {

      // Delete a custom property
      declarations.splice(index, 1);

      //Filter values
      let propertyHorizontal = getParam(declaration.value, 0);
      let propertyVertical = getParam(declaration.value, 1);

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
      if (propertyHorizontal === "left") {
        declarations.push({
          type: 'declaration',
          property: 'justify-content',
          value: 'flex-start'
        });
      }

      if (propertyHorizontal === "right") {
        declarations.push({
          type: 'declaration',
          property: 'justify-content',
          value: 'flex-end'
        });
      }

      if (propertyHorizontal === "center") {
        declarations.push({
          type: 'declaration',
          property: 'justify-content',
          value: propertyHorizontal
        });
      }

      // verify the property with second value
      if (propertyVertical === "top") {
        declarations.push({
          type: 'declaration',
          property: 'align-items',
          value: 'flex-start'
        });
      }

      if (propertyVertical === "bottom") {
        declarations.push({
          type: 'declaration',
          property: 'align-items',
          value: 'flex-end'
        });
      }

      if (propertyVertical === "center") {
        declarations.push({
          type: 'declaration',
          property: 'align-items',
          value: propertyVertical
        });
      }

    }

  });

};

module.exports = bnnAlign;
