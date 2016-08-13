const getParam = require('../helpers/getParam.js');
const addProperty = require('../helpers/addProperty.js');
const removeProperty = require('../helpers/removeProperty.js');

/**
 * Compile the bnn-row property values into a centered responsive flex container.
 * @module src/core/bnnRow
 * @param {array} declarations - Declarations list for a single CSS rule (AST)
 */
const bnnRow = (declarations) => {

  declarations.forEach((declaration, index) => {

    if (declaration.property === 'bnn-row') {

      removeProperty(declarations, index);

      const width = getParam(declaration.value, 0);

      addProperty(declarations, index, 'margin-left', 'auto');
      addProperty(declarations, index, 'margin-right', 'auto');
      addProperty(declarations, index, 'max-width', width);
      addProperty(declarations, index, 'width', '100%');
      addProperty(declarations, index, 'flex-wrap', 'wrap');
      addProperty(declarations, index, 'display', 'flex');

    }

  });

};

module.exports = bnnRow;
