const getParam = require('../helpers/getParam.js');
const addProperty = require('../helpers/addProperty.js');
const removeProperty = require('../helpers/removeProperty.js');

/**
 * Compile the bnn-width property values into width and max-width.
 * @module src/core/bnnWidth
 * @param {array} declarations - Declarations list for a single CSS rule (AST)
 */
const bnnWidth = (declarations) => {

  declarations.forEach((declaration, index) => {

    if (declaration.property === 'bnn-width') {

      removeProperty(declarations, index);

      const propertyWidth = getParam(declaration.value, 0);

      addProperty(declarations, index, 'max-width', propertyWidth);
      addProperty(declarations, index, 'width', '100%');

    }

  });

};

module.exports = bnnWidth;
