/* eslint no-console: ["error", { allow: ["log"] }] */

const fs = require('fs');

// features injection
const config = {};
config.bnnSize = require('../src/bnnSize.js'),
config.bnnPosition = require('../src/bnnPosition.js'),
config.bnnGradient = require('../src/bnnGradient.js'),
config.bnnVariable = require('../src/bnnVariable.js'),
config.bnnImport = require('../src/bnnImport.js'),
config.bnnAlign = require('../src/bnnAlign.js');

const Banana = require('../src/banana.js')(config);

// Read, render and write
const fsRender = (input, output, log = 'done') => {

  const bnnStylesheet = fs.readFileSync(input, 'utf8');
  const cssStylesheet = Banana.render(input , bnnStylesheet);

  const bnnPath = output
                      .toString()
                      .replace(/.bnn/g,'.css');

  fs.writeFile(bnnPath, cssStylesheet);
  console.log(log);
};

module.exports = fsRender;
