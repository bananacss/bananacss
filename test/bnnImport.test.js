const assert = require('assert');
const css = require('css');
const bnnImport = require('../src/bnnImport.js');

describe('bnnImport()', () => {

  // --------------------------

  it('Should return the modulo.bnn file imported into the' +
    ' main.bnn file', () => {

    const ast = css.parse('@import fixtures/module.bnn; .a{width: 500px;}');
    const rules = ast.stylesheet.rules;

    ast.stylesheet.rules.forEach((rule, index) => {
      if (rule.import) bnnImport('test/main.bnn', rule.import, rules, index);
    });

    const result = css.stringify(ast);
    const expect = '.b {\n  color: #000;\n}\n\n.a {\n  width: 500px;\n}';

    assert.equal(result, expect);
  });

  // --------------------------

  it('Should return the modulo.bnn file imported into the' +
    ' main.bnn file on a diferent position.', () => {

    const ast = css.parse('.a{width: 500px;} @import fixtures/module.bnn;');
    const rules = ast.stylesheet.rules;

    ast.stylesheet.rules.forEach((rule, index) => {
      if (rule.import) bnnImport('test/main.bnn', rule.import, rules, index);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  width: 500px;\n}\n\n.b {\n  color: #000;\n}';

    assert.equal(result, expect);
  });

});
