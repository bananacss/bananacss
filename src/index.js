'use strict';

function example() {

  this.exampleTask1 = function() {
    console.log("Taks 1 done");
    return "Taks 1 done";
  };

  this.exampleTask2 = function() {
    console.log("Taks 2 done");
    return "Taks 2 done";
  };

}

module.exports = new example();
