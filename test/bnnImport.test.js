const assert = require('assert');
const css = require('css');

// ---------------------------------
// bnnImport()
// ---------------------------------

describe('bnnImport()', () => {

  const bnnImport = require('../src/bnnImport.js');

  // bnnImport() test 1
  it("Should return the modulo.bnn file imported into the main.bnn file", () => {

    let ast = css.parse("@import fixtures/module.bnn; .a{width: 500px;}");

    ast.stylesheet.rules.forEach((rule, index) => {
      if (rule.import) bnnImport("test/main.bnn", rule.import, ast.stylesheet.rules, index);
    });

    let result = css.stringify(ast);
    let expect = ".b {\n  color: #000;\n}\n\n.a {\n  width: 500px;\n}";

    assert.equal(result, expect);
  });

});
