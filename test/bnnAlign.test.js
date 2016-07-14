const assert = require('assert');
const css    = require('css');

// ---------------------------------
// bnnAlign()
// ---------------------------------

describe('bnnAlign()', () => {

  const bnnAlign = require('../src/bnnAlign.js');

  // bnnAlign() test 1
  it("Should return a vertical and horizontal centralized flex container with one value", () => {

    let ast = css.parse(".a{bnn-align: center;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: center;\n}";

    assert.equal(result, expect);
  });

  // bnnAlign() test 2
  it("Should return a vertical and horizontal centralized flex container with two values", () => {

    let ast = css.parse(".a{bnn-align: center center;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: center;\n}";

    assert.equal(result, expect);
  });

  // bnnAlign() test 3
  it("Should return a flex container aligned to left with one value", () => {

    let ast = css.parse(".a{bnn-align: left;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n}";

    assert.equal(result, expect);
  });

  // bnnAlign() test 4
  it("Should return a flex container aligned to right with one value", () => {

    let ast = css.parse(".a{bnn-align: right;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n}";
    assert.equal(result, expect);
  });

  // bnnAlign() test 5
  it("Should return a flex container, with the content to top with one value", () => {

    let ast = css.parse(".a{bnn-align: top;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n}";

    assert.equal(result, expect);
  });

  // bnnAlign() test 6
  it("Should return a flex container, with the content to bottom with one value", () => {

    let ast = css.parse(".a{bnn-align: bottom;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-end;\n}";

    assert.equal(result, expect);
  });

  // bnnAlign() test 7
  it("Should return a flex container, with the content to left and top", () => {

    let ast = css.parse(".a{bnn-align: left top;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  align-items: flex-start;\n}";

    assert.equal(result, expect);
  });

  // bnnAlign() test 9
  it("Should return a flex container, with the content to left and bottom", () => {

    let ast = css.parse(".a{bnn-align: left bottom;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  align-items: flex-end;\n}";

    assert.equal(result, expect);
  });

  // bnnAlign() test 10
  it("Should return a flex container, with the content to right and top", () => {

    let ast = css.parse(".a{bnn-align: right top;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  align-items: flex-start;\n}";

    assert.equal(result, expect);
  });

  // bnnAlign() test 11
  it("Should return a flex container, with the content to right and bottom", () => {

    let ast = css.parse(".a{bnn-align: right bottom;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  align-items: flex-end;\n}";

    assert.equal(result, expect);
  });

  // bnnAlign() test 12
  it("Should return a flex container, with the content to center and bottom", () => {

    let ast = css.parse(".a{bnn-align: center bottom;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: flex-end;\n}";

    assert.equal(result, expect);
  });

  // bnnAlign() test 13
  it("Should return a flex container, with the content to right and center", () => {

    let ast = css.parse(".a{bnn-align: right center;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  align-items: center;\n}";

    assert.equal(result, expect);
  });

});
