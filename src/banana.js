'use strict';

const css = require('css'),
      setShorthand = require('./setShorthand');

function Banana() {

  this.render = (stylesheet) => {

    // Create the AST Tree
    let ast = css.parse(stylesheet);

    // Set all Shorthands
    setShorthand(ast,"bnn-size","width","height");
    setShorthand(ast,"bnn-position","top","right","bottom","left");

    // stringify the AST Tree
    let astStringify = css.stringify(ast);

    // console.log(astStringify);
    return astStringify;

  };

}

module.exports = new Banana();
