/**
 * Compile the bnn-box property values into correct box model.
 * @module src/core/bnnBox
 * @param {array} rule - Single CSS rule (AST)
 */

const bnnBox = (rule) => {
  rule.findDeclarationsByProperty('bnn-box', (declaration, index) => {

    rule.removeDeclaration(index);

      let boxModel = declaration.getParam(0);

      if (boxModel === 'inside') {
        boxModel = 'border-box';
      }

      if (boxModel === 'outside') {
        boxModel = 'content-box';
      }

      rule.addDeclaration('box-sizing', boxModel, index);

  });
};

module.exports = bnnBox;
