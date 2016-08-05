const getParam = require('./getParam.js');

const bnnPosition = (declarations) => {

  declarations.forEach((declaration, index) => {

    if (declaration.property === 'bnn-position') {

      // Delete the custom property
      declarations.splice(index, 1);

      const propertyValue1 = getParam(declaration.value, 0);
      const propertyValue2 = getParam(declaration.value, 1);
      const propertyValue3 = getParam(declaration.value, 2);
      const propertyValue4 = getParam(declaration.value, 3);

      if (propertyValue1 === 'center') {

        // Add new declaration
        declarations.push({
          type: 'declaration',
          property: 'display',
          value: 'block'
        });

        // Add new declaration
        declarations.push({
          type: 'declaration',
          property: 'margin-left',
          value: 'auto'
        });

        // Add new declaration
        declarations.push({
          type: 'declaration',
          property: 'margin-right',
          value: 'auto'
        });

      } else {

        // Add new declaration
        declarations.push({
          type: 'declaration',
          property: 'top',
          value: propertyValue1
        });

        // Add new declaration
        declarations.push({
          type: 'declaration',
          property: 'right',
          value: propertyValue2
        });

        // Add new declaration
        declarations.push({
          type: 'declaration',
          property: 'bottom',
          value: propertyValue3
        });

        // Add new declaration
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
