const assert = require('assert'),
      css    = require('css');

// ---------------------------------
// render()
// ---------------------------------

describe('render()', () => {

  const banana = require('../src/banana.js');

  // render() test 1
  it("should return the fully rendered css", () => {
    let stylesheet = ".a {color:#000;bnn-size: 50px 100px;}.b {color:#000;bnn-position: 10px 5px 8px 90px;margin: 10px;}";

    let result = banana.render(stylesheet);
    let expect = ".a {\n  color: #000;\n  width: 50px;\n  height: 100px;\n}\n\n.b {\n  color: #000;\n  margin: 10px;\n  top: 10px;\n  right: 5px;\n  bottom: 8px;\n  left: 90px;\n}";

    assert.equal(result, expect);
  });

});

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

});

// ---------------------------------
// bnnAlign()
// ---------------------------------

describe('bnnAlign()', () => {

  const bnnAlign = require('../src/bnnAlign.js');

  // bnnAlign() test 1
  it("If the value is center, should return a margin-left: auto; and margin-right: auto.", () => {

    let ast = css.parse(".a{bnn-align: center;}");

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    let result = css.stringify(ast);
    let expect = ".a {\n  margin-left: auto;\n  margin-right: auto;\n}";

    assert.equal(result, expect);
  });

});

// ---------------------------------
// getParam()
// ---------------------------------

describe('getParam()', () => {

  const getParam = require('../src/getParam.js');

  // getParam() test 1
  it("Should return a specific value of a shorthand.", () => {
    let result = getParam("10px 20px 30px 40px", 2);
    let expect = "30px";

    assert.equal(result, expect);
  });

  // getParam() test 2
  it("If dont exist the especific value, should return the first value of a shorthand.", () => {
    let result = getParam("30px 10px", 3);
    let expect = "30px";

    assert.equal(result, expect);
  });

});
