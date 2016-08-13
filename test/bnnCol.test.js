const assert = require('assert');
const css = require('css');
const bnnCol = require('../src/core/bnnCol.js');

describe('bnnCol()', () => {

  // --------------------------

  it('Should return a corresponding width with calc()' +
    ' and margins gutters.', () => {

    const ast = css.parse('.a{bnn-col: 3/12 5px;}');

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnCol(rule.declarations);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  width: calc(((100% * 3) / 12) - (5px * 2));\n' +
      '  margin-right: 5px;\n  margin-left: 5px;\n}';

    assert.equal(result, expect);
  });

  // --------------------------

  it('Should return a corresponding width with calc()' +
    ' and 0px of gutters.', () => {

    const ast = css.parse('.a{bnn-col: 3/12;}');

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnCol(rule.declarations);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  width: calc(((100% * 3) / 12) - (0px * 2));\n' +
      '  margin-right: 0px;\n  margin-left: 0px;\n}';

    assert.equal(result, expect);
  });

});
