var assert = require('assert'),
    banana = require('../src/banana.js');

describe('banana', function(){

  it("should transform the 'bnn-size' to width and height propertyes", function(){

    var result = banana.render(),
        expect = "";

    assert.equal(result, expect);
  });

});
