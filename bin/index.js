#!/usr/bin/env node

const program  = require('commander'),
      pkg      = require('../package.json'),
      chokidar = require('chokidar'),
      fsRender = require('./fsRender.js');

let input_path,
    output_path;

// program configs
program
  .version(pkg.version)
  .description(pkg.description)
  .option('-o, --out', "output to <dir> when passing files")
  .option('-w, --watch', "watch for changes")
  .arguments('<input_file> [output_file...]')
  .action((input_file, output_file = input_file) => {
    input_path  = input_file;
    output_path = output_file;
  })
  .parse(process.argv);

// execute the program with corresponding option
if (program.watch && program.out) {
  // $ banana <input_path> -o -w <output_path>
  console.log("Watching for changes...");

  // watch
  let watcher = chokidar.watch(input_path, {persistent: true});
  watcher.on('change', (input_path) => {
    fsRender(input_path, output_path);
    console.log('File', input_path, 'has been changed');
  });

} else if (program.watch) {
  // $ banana <input_path> -w
  console.log("Watching for changes...");

  // watch
  let watcher = chokidar.watch(input_path, {persistent: true});
  watcher.on('change', (input_path) => {
    fsRender(input_path, input_path);
    console.log('File', input_path, 'has been changed');
  });

} else if (program.out) {
  // $ banana <input_path> -o <output_path>
  fsRender(input_path, output_path);
  console.log("Your file has been compiled");

} else {
  // $ banana <input_path>
  fsRender(input_path, input_path);
  console.log("Your file has been compiled");

}

// Export the input_path
exports.inputPath = () => input_path;
