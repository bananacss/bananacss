const assert = require('assert');
const css = require('css');
const bnnGradient = require('../src/bnnGradient.js');

describe('bnnGradient()', () => {

  // --------------------------

  it('Should return a gradient with two colors.', () => {

    const ast = css.parse('.a{bnn-gradient: red yellow;}');

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnGradient(rule.declarations);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  background-image: linear-gradient' +
      '(to bottom, red, yellow);\n}';

    assert.equal(result, expect);
  });

  // --------------------------

  it('If the third value is vertical, should return a to bottom' +
    ' gradient.', () => {

    const ast = css.parse('.a{bnn-gradient: red yellow vertical;}');

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnGradient(rule.declarations);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  background-image: linear-gradient' +
      '(to bottom, red, yellow);\n}';

    assert.equal(result, expect);
  });

  // --------------------------

  it('If the third value is hotizontal, should return a to left' +
    ' gradient.', () => {

    const ast = css.parse('.a{bnn-gradient: red yellow horizontal;}');

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnGradient(rule.declarations);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  background-image: linear-gradient' +
      '(to left, red, yellow);\n}';

    assert.equal(result, expect);
  });

});
