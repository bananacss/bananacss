const assert = require('assert');
const exec = require('child_process').exec;
const fs = require('fs');

describe('$ banana <input_path> -o <output_path>', () => {

  // Compile the .bnn file
  before((done) => {
    const command = 'node bin/index.js test/fixtures/style.bnn -o' +
      ' test/fixtures/outputStyle.css';

    exec(command, () => done());
  });

  it('Should be return the compiled .CSS file with specific path', () => {
    const result = fs.readFileSync('test/fixtures/outputStyle.css', 'utf8');
    const expect = fs.readFileSync('test/fixtures/expects/style.css', 'utf8');

    assert.equal(result, expect);

  });

  // Delete the .css result
  after((done) => {
    fs.unlink('test/fixtures/outputStyle.css');
    done();
  });

});
