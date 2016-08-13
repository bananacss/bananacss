const getParam = require('../helpers/getParam.js');
const addProperty = require('../helpers/addProperty.js');
const removeProperty = require('../helpers/removeProperty.js');

/**
 * Compile the bnn-col property values into corresponding width and margins.
 * @module src/core/bnnCol
 * @param {array} declarations - Declarations list for a single CSS rule (AST)
 */
const bnnCol = (declarations) => {

  declarations.forEach((declaration, index) => {

    if (declaration.property === 'bnn-col') {

      removeProperty(declarations, index);

      const gridCols = getParam(declaration.value, 0);
      let gutter = getParam(declaration.value, 1);

      const cols = gridCols.split(/\//);

      const colsWidth = cols[0];
      const totalCols = cols[1];

      if (gutter === gridCols) {
        gutter = '0px';
      }

      const width = `calc(((100% * ${colsWidth}) / ${totalCols}) - (${gutter} * 2))`;

      addProperty(declarations, index, 'margin-left', gutter);
      addProperty(declarations, index, 'margin-right', gutter);
      addProperty(declarations, index, 'width', width);

    }

  });

};

module.exports = bnnCol;
