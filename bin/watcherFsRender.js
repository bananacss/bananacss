/* eslint no-console: ["error", { allow: ["log"] }] */

const chokidar = require('chokidar');
const fsRender = require('./fsRender');

const watcherFsRender = (inputPath, outputPath) => {

  const watcher = chokidar.watch(inputPath, {persistent: true});
  console.log('Watching for changes...');

  watcher.on('change', (inputPath) => {
    fsRender(inputPath, outputPath);
  });

};

module.exports = watcherFsRender;
