const assert = require('assert');
const exec = require('child_process').exec;
const pkg = require( '../package.json' );

describe('$ banana --version', () => {

  let captured_stdout;

  // Get the program version
  before((done) => {
      exec('node bin/index.js --version', (error, stdout, stderr) => {
          captured_stdout = stdout;
          done();
      });
  });

  it('Should be return the program version', () => {
    let result = captured_stdout.replace( '\n', '' );
    let expect = pkg.version;

    assert.equal(result, expect);
  });
});
