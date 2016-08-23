/**
 * Compile the bnn-row property values into
 * a centered responsive flex container.
 * @module src/core/bnnRow
 * @param {array} rule - Single CSS rule (AST)
 */

const bnnRow = (rule) => {
  rule.findDeclarationsByProperty('bnn-row', (declaration, index) => {

    rule.removeDeclaration(index);

    const width = declaration.getParam(0);

    rule.addDeclaration('margin-left', 'auto', index);
    rule.addDeclaration('margin-right', 'auto', index);
    rule.addDeclaration('max-width', width, index);
    rule.addDeclaration('width', '100%', index);
    rule.addDeclaration('flex-wrap', 'wrap', index);
    rule.addDeclaration('display', 'flex', index);

  });
};

module.exports = bnnRow;
