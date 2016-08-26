const assert = require('assert');
const css = require('css');
const addIterations = require('css-ast-iterations');
const bnnSize = require('../src/core/bnnSize.js');

describe('bnnSize()', () => {

  // --------------------------

  it('Should return a width and height with one specific value.', () => {

    const ast = css.parse('.a{bnn-size: 10px;}');
    addIterations(ast);

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnSize(rule);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  width: 10px;\n  height: 10px;\n}';

    assert.equal(result, expect);
  });

  // --------------------------

  it('Should return a width and height with two specific values.', () => {

    const ast = css.parse('.a{bnn-size: 10px 50px;}');
    addIterations(ast);

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnSize(rule);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  width: 10px;\n  height: 50px;\n}';

    assert.equal(result, expect);
  });

});
