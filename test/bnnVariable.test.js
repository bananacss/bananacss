const assert = require('assert');
const css = require('css');
const addIterations = require('css-ast-iterations');
const bnnVariable = require('../src/core/bnnVariable.js');

describe('bnnVariable()', () => {

  // --------------------------

  it('Should return a properties with variable value', () => {

    const ast = css.parse(':root {--banana-color: #fff000;' +
      '--banana-size: 1px;} .a{color: var(--banana-color);}' +
      ' .b{width: var(--banana-size);}');
    addIterations(ast);

    ast.stylesheet.rules.forEach((rule, index) => {
      if ('' + rule.selectors === ':root') {
        bnnVariable(ast, rule, index);
      }
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  color: #fff000;\n}\n\n.b {\n  width: 1px;\n}';

    assert.equal(result, expect);
  });

});
