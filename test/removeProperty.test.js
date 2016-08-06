const assert = require('assert');
const css = require('css');
const removeProperty = require('../src/removeProperty.js');

describe('removeProperty()', () => {

  // --------------------------

  it('Should return a CSS with one property removed.', () => {

    const ast = css.parse('.a{color: #000; width: 100%;}');

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) {
        removeProperty(rule.declarations, 1);
      }
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  color: #000;\n}';

    assert.equal(result, expect);
  });

});
