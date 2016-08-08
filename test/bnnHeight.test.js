const assert = require('assert');
const css = require('css');
const bnnHeight = require('../src/core/bnnHeight.js');

describe('bnnHeight()', () => {

  // --------------------------

  it('Should return a responsive combination of height' +
    ' and max-height values.', () => {

    const ast = css.parse('.a{bnn-height: 300px;}');

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnHeight(rule.declarations);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  height: 100%;\n  max-height: 300px;\n}';

    assert.equal(result, expect);
  });

});
