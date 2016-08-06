const assert = require('assert');
const css = require('css');
const addProperty = require('../src/addProperty.js');

describe('addProperty()', () => {

  // --------------------------

  it('Should return a CSS with one property added.', () => {

    const ast = css.parse('.a{color: #000;}');

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) {
        addProperty(rule.declarations, 1, 'width', '100%');
      }
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  color: #000;\n  width: 100%;\n}';

    assert.equal(result, expect);
  });

  // --------------------------

  it('Should return a CSS with two property added.', () => {

    const ast = css.parse('.a{color: #000; width: 100%;}');

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) {
        addProperty(rule.declarations, 1, 'height', '50px');
        addProperty(rule.declarations, 1, 'font-size', '1em');
      }
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  color: #000;\n  font-size: 1em;\n' +
      '  height: 50px;\n  width: 100%;\n}';

    assert.equal(result, expect);
  });

});
