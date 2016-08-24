const assert = require('assert');
const css = require('css');
const addIterations = require('css-ast-iterations');
const bnnImport = require('../src/core/bnnImport.js');

describe('bnnImport()', () => {

  // --------------------------

  it('Should return the modulo.bnn file imported into the' +
    ' main.bnn file', () => {

    const ast = css.parse('@import fixtures/module.bnn; .a{width: 500px;}');
    addIterations(ast);

    ast.stylesheet.rules.forEach((rule, index) => {
      if (rule.import) bnnImport('test/main.bnn', rule.import, ast, index);
    });

    const result = css.stringify(ast);
    const expect = '.b {\n  color: #000;\n}\n\n.a {\n  width: 500px;\n}';

    assert.equal(result, expect);
  });

  // --------------------------

  it('Should return the modulo.bnn file imported into the' +
    ' main.bnn file on a diferent position.', () => {

    const ast = css.parse('.a{width: 500px;} @import fixtures/module.bnn;');
    addIterations(ast);

    ast.stylesheet.rules.forEach((rule, index) => {
      if (rule.import) bnnImport('test/main.bnn', rule.import, ast, index);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  width: 500px;\n}\n\n.b {\n  color: #000;\n}';

    assert.equal(result, expect);
  });

});
