const assert = require('assert');
const css = require('css');
const addIterations = require('css-ast-iterations');
const bnnFunction = require('../src/core/bnnFunction.js');

describe('bnnFunction()', () => {

  // --------------------------

  it('', () => {

    const ast = css.parse('');
    addIterations(ast);

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnFunction(rule);
    });

    const result = '';
    const expect = '';

    assert.equal(result, expect);
  });

});
