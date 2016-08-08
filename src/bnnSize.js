const getParam = require('./getParam.js');
const addProperty = require('./addProperty.js');
const removeProperty = require('./removeProperty.js');

/**
 * Compile the bnn-size property values into width and height.
 * @module src/bnnSize
 * @param {array} declarations - Declarations list for a single CSS rule (AST)
 */
const bnnSize = (declarations) => {

  declarations.forEach((declaration, index) => {

    if (declaration.property === 'bnn-size') {

      removeProperty(declarations, index);

      const propertyWidth = getParam(declaration.value, 0);
      const propertyHeight = getParam(declaration.value, 1);

      addProperty(declarations, index, 'height', propertyHeight);
      addProperty(declarations, index, 'width', propertyWidth);

    }

  });

};

module.exports = bnnSize;
