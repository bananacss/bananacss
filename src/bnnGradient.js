const getParam = require('./getParam.js');

let bnnGradient = (declarations) => {

  // Search for declarations
  declarations.forEach((declaration, index) => {

    // Find a custom property
    if (declaration.property === "bnn-gradient") {

      // Delete a custom property
      declarations.splice(index, 1);

      //Filter values
      let color1 = getParam(declaration.value, 0);
      let color2 = getParam(declaration.value, 1);
      let orientation = getParam(declaration.value, 2);

      //verify the property value
      if (orientation === "horizontal") {
        orientation = "to left, ";
      } else {
        orientation = "to bottom, ";
      }

      // Add properties and values
      declarations.push({
        type: 'declaration',
        property: 'background-image',
        value: "linear-gradient("+orientation+color1+", "+color2+")"
      });

    }

  });

};

module.exports = bnnGradient;
