const assert = require('assert');
const css = require('css');
const bnnSize = require('../src/core/bnnSize.js');

describe('bnnSize()', () => {

  // --------------------------

  it('Should return a width and height with one specific value.', () => {

    const ast = css.parse('.a{bnn-size: 10px;}');

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnSize(rule.declarations);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  width: 10px;\n  height: 10px;\n}';

    assert.equal(result, expect);
  });

  // --------------------------

  it('Should return a width and height with two specific values.', () => {

    const ast = css.parse('.a{bnn-size: 10px 50px;}');

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnSize(rule.declarations);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  width: 10px;\n  height: 50px;\n}';

    assert.equal(result, expect);
  });

});
