const assert = require('assert');
const css = require('css');
const bnnBox = require('../src/core/bnnBox.js');

describe('bnnBox()', () => {

  // --------------------------

  it('Should return a inside box model.', () => {

    const ast = css.parse('.a{bnn-box: inside;}');

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnBox(rule.declarations);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  box-sizing: border-box;\n}';

    assert.equal(result, expect);
  });

  // --------------------------

  it('Should return a outside box model.', () => {

    const ast = css.parse('.a{bnn-box: outside;}');

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnBox(rule.declarations);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  box-sizing: content-box;\n}';

    assert.equal(result, expect);
  });

});
