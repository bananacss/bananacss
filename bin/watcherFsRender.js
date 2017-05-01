/* eslint no-console: ["error", { allow: ["log"] }] */

const chokidar = require('chokidar');
const fsRender = require('./fsRender');

/**
 * Watch a file for read, render and write
 * @module bin/watcherFsRender
 * @see bin/fsRender
 * @param {string} inputPath - Input path for read a .bnn file
 * @param {string} outputPath - Output path for write a .css file
 */
const watcherFsRender = (inputPath, outputPath) => {

  const watcher = chokidar.watch(inputPath, {persistent: true});
  console.log('Watching for changes...');

  watcher.on('change', (inputPath) => {
    fsRender(inputPath, outputPath);
  });

};

export default watcherFsRender;
