'use strict';

const css = require('css'),
      replaceProperty = require('./replaceProperty');

function Banana() {

  this.render = (stylesheet) => {

    // Create the AST Tree
    let ast = css.parse(stylesheet);

    // Search the Custom custom properties and replace for css properties and values
    replaceProperty(ast,"bnn-size","width","height");
    replaceProperty(ast,"bnn-position","top","right","bottom","left");

    // stringify the AST Tree
    let astStringify = css.stringify(ast);

    // console.log(astStringify);
    return astStringify;

  };

}

module.exports = new Banana();
