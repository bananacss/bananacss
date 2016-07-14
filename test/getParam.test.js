const assert = require('assert');

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
