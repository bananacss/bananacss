#!/usr/bin/env node

/* eslint no-console: ["error", { allow: ["log"] }] */

const program  = require('commander');
const pkg = require('../package.json');
const chokidar = require('chokidar');
const fsRender = require('./fsRender.js');

let input_path;
let output_path;

// program configs
program
  .version(pkg.version)
  .description(pkg.description)
  .option('-o, --out', 'output to <dir> when passing files')
  .option('-w, --watch', 'watch for changes')
  .arguments('<input_file> [output_file...]')
  .action((input_file, output_file = input_file) => {
    input_path  = input_file;
    output_path = output_file;
  })
  .parse(process.argv);

// execute the program with corresponding option
if (program.watch) {
  // watch for changes
  const watcher = chokidar.watch(input_path, {persistent: true});
  console.log('Watching for changes...');

  watcher.on('change', (input_path) => {
    fsRender(input_path, input_path);
  });
} else if (program.watch && program.out) {
  // watch for changes
  const watcher = chokidar.watch(input_path, {persistent: true});
  console.log('Watching for changes...');

  watcher.on('change', (input_path) => {
    fsRender(input_path, output_path, 'File' + input_path + 'has been changed');
  });
} else if (program.out) {
  fsRender(input_path, output_path, 'Your file has been compiled');
} else {
  fsRender(input_path, input_path, 'Your file has been compiled');
}
