/**
 * Compile the bnn-box property values into correct box model.
 * @module src/core/bnnBox
 * @param {object} rule - Single CSS rule (AST)
 */

const bnnBox = (rule) => {
  rule.findDeclarationsByProperty('bnn-box', (declaration, index) => {
    const boxModels = {
      'inside': 'border-box',
      'outside': 'content-box'
    };

    rule.removeDeclaration(index);

    let boxModel = declaration.getParam(0);

    boxModel = boxModels[boxModel];

    rule.addDeclaration('box-sizing', boxModel, index);

  });
};

module.exports = bnnBox;
