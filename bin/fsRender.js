/* eslint no-console: ["error", { allow: ["log"] }] */

const fs = require('fs');

// features injection
const config = {};
config.bnnSize = require('../src/bnnSize.js');
config.bnnPosition = require('../src/bnnPosition.js');
config.bnnGradient = require('../src/bnnGradient.js');
config.bnnVariable = require('../src/bnnVariable.js');
config.bnnImport = require('../src/bnnImport.js');
config.bnnAlign = require('../src/bnnAlign.js');

const Banana = require('../src/banana.js')(config);

// Read, render and write
const fsRender = (inputPath, outputPath, log = 'Your file has been' +
  ' compiled') => {

  fs.readFile(inputPath, 'utf8', (err, data) => {

    // handling input error
    if (err) {
      return console.log('No such input file');
    }

    const isBnnFile = /\.(bnn)/.test(inputPath);

    if (!isBnnFile) {
      return console.log('Your input file doesn’t have the .bnn extension');
    }

    // handling output error
    if (!outputPath) {
      return console.log('No such output file');
    }

    const isCSSFile = /\.(css)/.test(outputPath);

    if (!isCSSFile) {
      return console.log('Your output file doesn’t have the .css extension');
    }

    const bnnStylesheet = data;
    const cssStylesheet = Banana.render(inputPath , bnnStylesheet);

    fs.writeFile(outputPath, cssStylesheet);
    console.log(log);

  });

};

module.exports = fsRender;
