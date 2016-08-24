/**
 * Compile the bnn-position property values
 * into top, right, left and bottom or centralize with margins.
 * @module src/core/bnnPosition
 * @param {object} rule - Single CSS rule (AST)
 */

const bnnPosition = (rule) => {
  rule.findDeclarationsByProperty('bnn-position', (declaration, index) => {

    rule.removeDeclaration(index);

    const propertyValue1 = declaration.getParam(0);
    const propertyValue2 = declaration.getParam(1);
    const propertyValue3 = declaration.getParam(2);
    const propertyValue4 = declaration.getParam(3);

    if (propertyValue1 === 'center') {
      rule.addDeclaration('margin-right', 'auto', index);
      rule.addDeclaration('margin-left', 'auto', index);
      rule.addDeclaration('display', 'block', index);
    } else {
      rule.addDeclaration('left', propertyValue4, index);
      rule.addDeclaration('bottom', propertyValue3, index);
      rule.addDeclaration('right', propertyValue2, index);
      rule.addDeclaration('top', propertyValue1, index);
    }

  });
};

module.exports = bnnPosition;
