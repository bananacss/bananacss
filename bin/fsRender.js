const fs = require('fs');

// features injection
const config = {};
config.bnnSize = require('../src/bnnSize.js'),
config.bnnPosition = require('../src/bnnPosition.js'),
config.bnnGradient = require('../src/bnnGradient.js'),
config.bnnImport = require('../src/bnnImport.js'),
config.bnnAlign = require('../src/bnnAlign.js');

const Banana = require('../src/banana.js')(config);

// Read, render and write
let fsRender = (input, output) => {
  // read the .bnn file
  let bnnStylesheet = fs.readFileSync(input, 'utf8');
  // render the .bnn file
  let cssStylesheet = Banana.render(input , bnnStylesheet);
  // convert the .bnn to .css and write the .css file
  fs.writeFile(output.toString().replace(/.bnn/g,".css"), cssStylesheet);
};

module.exports = fsRender;
