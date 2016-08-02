const assert = require('assert');
const css = require('css');

// ---------------------------------
// bnnVariable()
// ---------------------------------

describe('bnnVariable()', () => {

  const bnnVariable = require('../src/bnnVariable.js');

  // bnnVariable() test 1
  it("", () => {

    let ast = css.parse(":root {--banana-color: #fff000;--banana-size: 1px;} .a{color: var(--banana-color);} .b{width: var(--banana-size);}");

    ast.stylesheet.rules.forEach((rule, index) => {
      if (rule.selectors == ":root") bnnVariable(rule, ast.stylesheet.rules, index);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  color: #fff000;\n}\n\n.b {\n  width: 1px;\n}";

    assert.equal(result, expect);
  });

});
