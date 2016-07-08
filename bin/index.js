#!/usr/bin/env node

const banana  = require('../src/banana.js'),
      program = require('commander'),
      pkg     = require('../package.json'),
      fs      = require('fs');

// program configs
program
  .version(pkg.version)
  .description(pkg.description)
  .option('-o, --out', "Output to <dir> when passing files")
  .arguments('<input_file> [output_file...]')
  .action((input_file, output_file = input_file) => {
    input_path  = input_file;
    output_path = output_file;
  });

program.parse(process.argv);

// read the .bnn file
let bnnStylesheet = fs.readFileSync(input_path, 'utf8');

// render the .bnn file
let cssStylesheet = banana.render(bnnStylesheet);

// execute the program with flags or not
if (program.out) {
  fs.writeFile(output_path.toString(), cssStylesheet);
} else {
  fs.writeFile(input_path.replace(/.bnn/g,".css"), cssStylesheet);
}
