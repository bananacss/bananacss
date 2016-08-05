const assert = require('assert');
const exec = require('child_process').exec;
const pkg = require( '../package.json' );

describe('$ banana --version', () => {

  let captured_stdout;

  before((done) => {
    exec('node bin/index.js --version', (error, stdout) => {
      captured_stdout = stdout;
      done();
    });
  });

  it('Should be return the program version', () => {
    const result = captured_stdout.replace( '\n', '' );
    const expect = pkg.version;

    assert.equal(result, expect);
  });
});
