var assert  = require('assert'),
    example = require('../src/index.js');

describe('example', function(){

  it('should return a text for first Task', function(){
    var result = example.exampleTask1(),
        expect = "Taks 1 done";
    assert.equal(result, expect);
  });

  it('should return a text for seconds Task', function(){
    var result = example.exampleTask2(),
        expect = "Taks 2 done";
    assert.equal(result, expect);
  });

});
