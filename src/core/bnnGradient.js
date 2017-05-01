/**
 * Compile the bnn-gradient property values
 * into background-image: linear-gradient();.
 * @module src/core/bnnGradient
 * @param {object} rule - Single CSS rule (AST)
 */

const bnnGradient = (rule) => {
  rule.findDeclarationsByProperty('bnn-gradient', (declaration, index) => {

    rule.removeDeclaration(index);

    const propertyColor1 = declaration.getParam(0);
    const propertyColor2 = declaration.getParam(1);
    const propertyDirection = declaration.getParam(2);

    const Gradientdirection = (propertyDirection === 'horizontal')
      ? 'to left, '
      : 'to bottom, ';

    const linearGradient = `linear-gradient(${Gradientdirection}${propertyColor1}, ${propertyColor2})`;

    rule.addDeclaration('background-image', linearGradient, index);

  });
};

module.exports = bnnGradient;
