const assert = require('assert'),
      css    = require('css');

// ---------------------------------
// render()
// ---------------------------------

describe('render()', () => {

  const config = {};
  config.bnnSize = require('../src/bnnSize.js'),
  config.bnnPosition = require('../src/bnnPosition.js'),
  config.bnnGradient = require('../src/bnnGradient.js'),
  config.bnnImport = require('../src/bnnImport.js'),
  config.bnnAlign = require('../src/bnnAlign.js');

  const banana = require('../src/banana.js');
  // render() test 1
  it("should return the fully rendered css", () => {
    let stylesheet = ".a {color:#000;bnn-size: 50px 100px;}.b {color:#000;bnn-position: 10px 5px 8px 90px;margin: 10px;}";
    // console.log('banana', banana.run().render)
    let result = banana.run(config).render("teste.bnn", stylesheet);
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
    let expect = ".a {\n  width: 500px;\n}\n\n.b {\n  color: #000;\n}";

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
