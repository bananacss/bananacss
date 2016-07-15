const assert = require('assert');
const css = require('css');

// ---------------------------------
// bnnSize()
// ---------------------------------

describe('bnnSize()', () => {

  const bnnSize = require('../src/bnnSize.js');

  // bnnSize() test 1
  it("Should return a width and height with one specific value.", () => {

    let ast = css.parse(".a{bnn-size: 10px;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnSize(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  width: 10px;\n  height: 10px;\n}";

    assert.equal(result, expect);
  });

  // bnnSize() test 2
  it("Should return a width and height with two specific values.", () => {

    let ast = css.parse(".a{bnn-size: 10px 50px;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnSize(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  width: 10px;\n  height: 50px;\n}";

    assert.equal(result, expect);
  });

});
