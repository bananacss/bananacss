#!/usr/bin/env node

var banana  = require('../src/banana.js'),
    program = require('commander'),
    pkg     = require('../package.json'),
    fs  = require('fs');

program
  .version(pkg.version)
  .description(pkg.description)
  .option('-x, --xOption', "Option X example");

program.parse(process.argv);

var stylesheet = fs.readFileSync("../teste.bnn", 'utf8');

banana.render(stylesheet);
// if (program.yOption) banana.exampleTask2();
