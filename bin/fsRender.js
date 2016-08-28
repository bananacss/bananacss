/* eslint no-console: ["error", { allow: ["log"] }] */

const fs = require('fs');
const defaultConfig = require('./defaultConfig');

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

    // Inject the configs, compile and write .css file
    const bnnStylesheet = data;

    fs.readFile('./bananafile.json', 'utf8', (err, data) => {

      const config = (err)
        ? defaultConfig
        : JSON.parse(data);

      const Banana = require('../src/banana.js')(config);
      const cssStylesheet = Banana.render(bnnStylesheet, inputPath);

      fs.writeFile(outputPath, cssStylesheet);
      console.log(log);

    });

  });

};

module.exports = fsRender;
