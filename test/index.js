const assert   = require('assert');

// ---------------------------------
// render()
// ---------------------------------

describe('render()', () => {

  const banana = require('../src/banana.js');

  it("should return the fully rendered css", () => {
    let stylesheet = ".a {color:#000;bnn-size: 50px 100px;}.b {color:#000;bnn-position: 10px 5px 8px 90px;margin: 10px;}";

    let result = banana.render(stylesheet);
    let expect = ".a {\n  color: #000;\n  width: 50px;\n  height: 100px;\n}\n\n.b {\n  color: #000;\n  margin: 10px;\n  top: 10px;\n  right: 5px;\n  bottom: 8px;\n  left: 90px;\n}";

    assert.equal(result, expect);
  });

});

// ---------------------------------
// setShorthand()
// ---------------------------------

describe('setShorthand()', () => {

  const css = require('css');
  const setShorthand = require('../src/setShorthand.js');

  it("Should search for a 'bnn-size' and replace for css normal properties", () => {

    let stylesheet = ".a {color:#000; bnn-size: 50px 100px;}";
    let ast = css.parse(stylesheet);

    setShorthand(ast,"bnn-size","width","height");

    let result = css.stringify(ast);
    let expect = ".a {\n  color: #000;\n  width: 50px;\n  height: 100px;\n}";

    assert.equal(result, expect);
  });

});

// ---------------------------------
// getParam()
// ---------------------------------

describe('getParam()', () => {

  const getParam = require('../src/getParam.js');

  it("Should return a specific value of a shorthand.", () => {
    let result = getParam("10px 20px 30px 40px", 2);
    let expect = "30px";

    assert.equal(result, expect);
  });

  it("If dont exist the especific value, should return the first value of a shorthand.", () => {
    let result = getParam("30px 10px", 3);
    let expect = "30px";

    assert.equal(result, expect);
  });

});
