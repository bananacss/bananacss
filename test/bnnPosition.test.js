const assert = require('assert');
const css = require('css');

// ---------------------------------
// bnnPosition()
// ---------------------------------

describe('bnnPosition()', () => {

  const bnnPosition = require('../src/bnnPosition.js');

  // bnnPosition() test 1
  it("Should return a top,right,bottom and left with four specific value.", () => {

    let ast = css.parse(".a{bnn-position: 10px 20px 30px 40px;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnPosition(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  top: 10px;\n  right: 20px;\n  bottom: 30px;\n  left: 40px;\n}";

    assert.equal(result, expect);
  });

  // bnnPosition() test 2
  it("Should return a top,right,bottom and left with one specific value.", () => {

    let ast = css.parse(".a{bnn-position: 10px;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnPosition(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  top: 10px;\n  right: 10px;\n  bottom: 10px;\n  left: 10px;\n}";

    assert.equal(result, expect);
  });

  // bnnPosition() test 3
  it("If the value is center, should return a block centered element", () => {

    let ast = css.parse(".a{bnn-position: center;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnPosition(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}";

    assert.equal(result, expect);
  });

});
