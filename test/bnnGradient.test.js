const assert = require('assert');
const css = require('css');

// ---------------------------------
// bnnGradient()
// ---------------------------------

describe('bnnGradient()', () => {

  const bnnGradient = require('../src/bnnGradient.js');

  // bnnGradient() test 1
  it("Should return a gradient with two colors.", () => {

    let ast = css.parse(".a{bnn-gradient: red yellow;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnGradient(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  background-image: linear-gradient(to bottom, red, yellow);\n}";

    assert.equal(result, expect);
  });

  // bnnGradient() test 2
  it("If the third value is vertical, should return a to bottom gradient.", () => {

    let ast = css.parse(".a{bnn-gradient: red yellow vertical;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnGradient(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  background-image: linear-gradient(to bottom, red, yellow);\n}";

    assert.equal(result, expect);
  });

  // bnnGradient() test 3
  it("If the third value is hotizontal, should return a to left gradient.", () => {

    let ast = css.parse(".a{bnn-gradient: red yellow horizontal;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnGradient(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  background-image: linear-gradient(to left, red, yellow);\n}";

    assert.equal(result, expect);
  });

});
