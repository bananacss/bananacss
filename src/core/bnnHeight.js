const getParam = require('../helpers/getParam.js');
const addProperty = require('../helpers/addProperty.js');
const removeProperty = require('../helpers/removeProperty.js');

/**
 * Compile the bnn-height property values into height and max-height.
 * @module src/core/bnnHeight
 * @param {array} declarations - Declarations list for a single CSS rule (AST)
 */
const bnnHeight = (declarations) => {

  declarations.forEach((declaration, index) => {

    if (declaration.property === 'bnn-height') {

      removeProperty(declarations, index);

      const propertyHeight = getParam(declaration.value, 0);

      addProperty(declarations, index, 'max-height', propertyHeight);
      addProperty(declarations, index, 'height', '100%');

    }

  });

};

module.exports = bnnHeight;
