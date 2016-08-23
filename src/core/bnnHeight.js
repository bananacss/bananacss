/**
 * Compile the bnn-height property values into height and max-height.
 * @module src/core/bnnHeight
 * @param {array} rule - Single CSS rule (AST)
 */

const bnnHeight = (rule) => {
  rule.findDeclarationsByProperty('bnn-height', (declaration, index) => {

    rule.removeDeclaration(index);

    const height = declaration.getParam(0);

    rule.addDeclaration('max-height', height, index);
    rule.addDeclaration('height', '100%', index);

  });
};

module.exports = bnnHeight;
