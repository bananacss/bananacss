/* eslint no-console: ["error", { allow: ["log"] }] */

const fs = require('fs');

// features injection
const config = {};
config.bnnSize = true;
config.bnnPosition = true;
config.bnnGradient = true;
config.bnnVariable = true;
config.bnnImport = true;
config.bnnAlign = true;
config.bnnWidth = true;
config.bnnHeight = true;
config.bnnCol = true;
config.bnnRow = true;
config.bnnBox = true;
config.compress = false;

const Banana = require('../src/banana.js')(config);

/**
 * Read the file a .bnn file, render and write a .css file.
 * @module bin/fsRender
 * @param {string} inputPath - Input path for read a .bnn file
 * @param {string} outputPath - Output path for write a .css file
 * @param {string} log - Log for user feedback in terminal
 */
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
    const cssStylesheet = Banana.render(bnnStylesheet, inputPath);

    fs.writeFile(outputPath, cssStylesheet);
    console.log(log);

  });

};

module.exports = fsRender;
