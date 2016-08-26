const assert = require('assert');
const css = require('css');
const addIterations = require('css-ast-iterations');
const bnnBox = require('../src/core/bnnBox.js');

describe('bnnBox()', () => {

  // --------------------------

  it('Should return a inside box model.', () => {

    const ast = css.parse('.a{bnn-box: inside;}');
    addIterations(ast);

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnBox(rule);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  box-sizing: border-box;\n}';

    assert.equal(result, expect);
  });

  // --------------------------

  it('Should return a outside box model.', () => {

    const ast = css.parse('.a{bnn-box: outside;}');
    addIterations(ast);

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnBox(rule);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  box-sizing: content-box;\n}';

    assert.equal(result, expect);
  });

});
