/**
 * Compile the bnn-width property values into width and max-width.
 * @module src/core/bnnWidth
 * @param {array} rule - Single CSS rule (AST)
 */

const bnnWidth = (rule) => {
  rule.findDeclarationsByProperty('bnn-width', (declaration, index) => {

    rule.removeDeclaration(index);

    const width = declaration.getParam(0);

    rule.addDeclaration('max-width', width, index);
    rule.addDeclaration('width', '100%', index);

  });
};

module.exports = bnnWidth;
