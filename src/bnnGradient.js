const getParam = require('./getParam.js');

const bnnGradient = (declarations) => {

  declarations.forEach((declaration, index) => {

    if (declaration.property === 'bnn-gradient') {

      // Delete the custom property
      declarations.splice(index, 1);

      const propertyColor1 = getParam(declaration.value, 0);
      const propertyColor2 = getParam(declaration.value, 1);
      const propertyDirection = getParam(declaration.value, 2);

      const Gradientdirection = (propertyDirection === 'horizontal')
        ? 'to left, '
        : 'to bottom, ';

      const linearGradient = 'linear-gradient(' + Gradientdirection +
        propertyColor1 + ', ' + propertyColor2 + ')';

      // Add new declaration
      declarations.push({
        type: 'declaration',
        property: 'background-image',
        value: linearGradient
      });

    }

  });

};

module.exports = bnnGradient;
