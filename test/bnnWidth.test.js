const assert = require('assert');
const css = require('css');
const bnnWidth = require('../src/core/bnnWidth.js');

describe('bnnWidth()', () => {

  // --------------------------

  it('Should return a responsive combination of width' +
    ' and max-width values.', () => {

    const ast = css.parse('.a{bnn-width: 300px;}');

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnWidth(rule.declarations);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  width: 100%;\n  max-width: 300px;\n}';

    assert.equal(result, expect);
  });

});
