const banana = require('../src/banana.js'),
      fs     = require('fs');

// Read, render and write
let fsRender = (input, output) => {
  // read the .bnn file
  let bnnStylesheet = fs.readFileSync(input, 'utf8');
  // render the .bnn file
  let cssStylesheet = banana.render(bnnStylesheet);
  // convert the .bnn to .css and write the .css file
  fs.writeFile(output.toString().replace(/.bnn/g,".css"), cssStylesheet);
};

module.exports = fsRender;
