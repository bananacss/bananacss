/**
 * Compile the bnn-size property values into width and height.
 * @module src/core/bnnSize
 * @param {object} rule - Single CSS rule (AST)
 */

const bnnSize = (rule) => {
  rule.findDeclarationsByProperty('bnn-size', (declaration, index) => {

    rule.removeDeclaration(index);

    const width = declaration.getParam(0);
    const height = declaration.getParam(1);

    rule.addDeclaration('height', height, index);
    rule.addDeclaration('width', width, index);

  });
};

module.exports = bnnSize;
