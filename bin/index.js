#!/usr/bin/env node

const program  = require('commander');
const pkg = require('../package.json');
const fsRender = require('./fsRender.js');
const watcherFsRender = require('./watcherFsRender');

let inputPath;
let outputPath;

// program configs
program
  .version(pkg.version)
  .description(pkg.description)
  .option('-o, --out', 'output to <dir> when passing files')
  .option('-w, --watch', 'watch for changes')
  .arguments('<inputFile> [outputFile...]')
  .action((inputFile, outputFile = inputFile) => {
    inputPath  = inputFile.toString();
    outputPath = outputFile.toString();
  })
  .parse(process.argv);

const defaultOutputPath = inputPath.replace(/.bnn/g,'.css');

// execute the program with corresponding option
if (program.watch) {
  watcherFsRender(inputPath, defaultOutputPath);
} else if (program.watch && program.out) {
  watcherFsRender(inputPath, outputPath);
} else if (program.out) {
  fsRender(inputPath, outputPath);
} else {
  fsRender(inputPath, defaultOutputPath);
}
