const assert = require('assert');
const css = require('css');
const addIterations = require('css-ast-iterations');
const bnnRow = require('../src/core/bnnRow.js');

describe('bnnRow()', () => {

  // --------------------------

  it('Should return a centered responsive flex container.', () => {

    const ast = css.parse('.a{bnn-row: 900px;}');
    addIterations(ast);

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnRow(rule);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  display: flex;\n  flex-wrap: wrap;\n' +
      '  width: 100%;\n  max-width: 900px;\n  margin-right: auto;\n' +
      '  margin-left: auto;\n}';

    assert.equal(result, expect);
  });

});
