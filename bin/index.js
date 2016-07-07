#!/usr/bin/env node

var example = require('../src/index.js'),
    program = require('commander'),
    pkg     = require('../package.json');

program
  .version(pkg.version)
  .description(pkg.description)
  .option('-x, --xOption', "Option X example")
  .option('-y, --yOption', "Option Y example");

program.parse(process.argv);

if (program.xOption) example.exampleTask1();
if (program.yOption) example.exampleTask2();
