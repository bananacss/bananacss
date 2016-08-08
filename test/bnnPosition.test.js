const assert = require('assert');
const css = require('css');
const bnnPosition = require('../src/core/bnnPosition.js');

describe('bnnPosition()', () => {

  // --------------------------

  it('Should return a top,right,bottom and left with four specific' +
    ' value.', () => {

    const ast = css.parse('.a{bnn-position: 10px 20px 30px 40px;}');

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnPosition(rule.declarations);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  top: 10px;\n  right: 20px;\n  bottom: 30px;\n' +
      '  left: 40px;\n}';

    assert.equal(result, expect);
  });

  // --------------------------

  it('Should return a top,right,bottom and left with one specific' +
    ' value.', () => {

    const ast = css.parse('.a{bnn-position: 10px;}');

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnPosition(rule.declarations);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  top: 10px;\n  right: 10px;\n  bottom: 10px;\n' +
      '  left: 10px;\n}';

    assert.equal(result, expect);
  });

  // --------------------------

  it('If the value is center, should return a block centered element', () => {

    const ast = css.parse('.a{bnn-position: center;}');

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnPosition(rule.declarations);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  display: block;\n  margin-left: auto;\n' +
      '  margin-right: auto;\n}';

    assert.equal(result, expect);
  });

});
