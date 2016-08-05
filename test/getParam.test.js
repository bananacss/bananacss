const assert = require('assert');
const getParam = require('../src/getParam.js');

describe('getParam()', () => {

  // --------------------------

  it('Should return a specific value of a shorthand.', () => {

    const result = getParam('10px 20px 30px 40px', 2);
    const expect = '30px';

    assert.equal(result, expect);
  });

  // --------------------------

  it('If dont exist the especific value, should return the' +
    ' first value of a shorthand.', () => {

    const result = getParam('30px 10px', 3);
    const expect = '30px';

    assert.equal(result, expect);
  });

});
