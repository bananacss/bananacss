/**
 * Compile the bnn-col property values into corresponding width and margins.
 * @module src/core/bnnCol
 * @param {object} rule - Single CSS rule (AST)
 */

const bnnCol = (rule) => {
  rule.findDeclarationsByProperty('bnn-col', (declaration, index) => {

    rule.removeDeclaration(index);

    const gridCols = declaration.getParam(0);
    let gutter = declaration.getParam(1);

    const cols = gridCols.split(/\//);

    const colsWidth = cols[0];
    const totalCols = cols[1];

    if (gutter === gridCols) {
      gutter = '0px';
    }

    const width = `calc(((100% * ${colsWidth}) / ${totalCols})` +
    ` - (${gutter} * 2))`;

    rule.addDeclaration('margin-left', gutter, index);
    rule.addDeclaration('margin-right', gutter, index);
    rule.addDeclaration('width', width, index);

  });
};

module.exports = bnnCol;
