const getParam = require('../helpers/getParam.js');
const addProperty = require('../helpers/addProperty.js');
const removeProperty = require('../helpers/removeProperty.js');

/**
 * Compile the bnn-box property values into correct box model.
 * @module src/core/bnnBox
 * @param {array} declarations - Declarations list for a single CSS rule (AST)
 */
const bnnBox = (declarations) => {

  declarations.forEach((declaration, index) => {

    if (declaration.property === 'bnn-box') {

      removeProperty(declarations, index);

      let boxModel = getParam(declaration.value, 0);

      if (boxModel === 'inside') {
        boxModel = 'border-box';
      }

      if (boxModel === 'outside') {
        boxModel = 'content-box';
      }

      addProperty(declarations, index, 'box-sizing', boxModel);

    }

  });

};

module.exports = bnnBox;
