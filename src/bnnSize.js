const getParam = require('./getParam.js');

const bnnSize = (declarations) => {

  declarations.forEach((declaration, index) => {

    if (declaration.property === 'bnn-size') {

      // Delete the custom property
      declarations.splice(index, 1);

      const propertyWidth = getParam(declaration.value, 0);
      const propertyHeight = getParam(declaration.value, 1);

      // Add new declaration
      declarations.push({
        type: 'declaration',
        property: 'width',
        value: propertyWidth
      });

      // Add new declaration
      declarations.push({
        type: 'declaration',
        property: 'height',
        value: propertyHeight
      });

    }

  });

};


module.exports = bnnSize;
