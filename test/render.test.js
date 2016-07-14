const assert = require('assert');
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
    const stylesheet = ".a {color:#000;bnn-size: 50px 100px;}.b {color:#000;bnn-position: 10px 5px 8px 90px;margin: 10px;}";
    const result = banana.run(config).render("teste.bnn", stylesheet);
    const expect = ".a {\n  color: #000;\n  width: 50px;\n  height: 100px;\n}\n\n.b {\n  color: #000;\n  margin: 10px;\n  top: 10px;\n  right: 5px;\n  bottom: 8px;\n  left: 90px;\n}";

    assert.equal(result, expect);
  });

});
