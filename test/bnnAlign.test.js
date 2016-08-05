const assert = require('assert');
const css = require('css');
const bnnAlign = require('../src/bnnAlign.js');

describe('bnnAlign()', () => {

  // --------------------------

  it('Should return a vertical and horizontal centralized flex container' +
    'with one value', () => {

    const ast = css.parse('.a{bnn-align: center;}');

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  display: flex;\n  flex-wrap: wrap;\n' +
      '  justify-content: center;\n  align-items: center;\n}';

    assert.equal(result, expect);
  });

  // --------------------------

  it('Should return a vertical and horizontal centralized flex' +
    ' container with two values', () => {

    const ast = css.parse('.a{bnn-align: center center;}');

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  display: flex;\n  flex-wrap: wrap;\n  ' +
      'justify-content: center;\n  align-items: center;\n}';

    assert.equal(result, expect);
  });

  // --------------------------

  it('Should return a flex container aligned to left with one value', () => {

    const ast = css.parse('.a{bnn-align: left;}');

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  display: flex;\n  flex-wrap: wrap;\n  ' +
      'justify-content: flex-start;\n}';

    assert.equal(result, expect);
  });

  // --------------------------

  it('Should return a flex container aligned to right with one value', () => {

    const ast = css.parse('.a{bnn-align: right;}');

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  display: flex;\n  flex-wrap: wrap;\n  ' +
      'justify-content: flex-end;\n}';
    assert.equal(result, expect);
  });

  // --------------------------

  it('Should return a flex container, with the content to top with' +
    ' one value', () => {

    const ast = css.parse('.a{bnn-align: top;}');

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  display: flex;\n  flex-wrap: wrap;\n  ' +
      'align-items: flex-start;\n}';

    assert.equal(result, expect);
  });

  // --------------------------

  it('Should return a flex container, with the content to bottom with' +
    ' one value', () => {

    const ast = css.parse('.a{bnn-align: bottom;}');

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  display: flex;\n  flex-wrap: wrap;\n  ' +
      'align-items: flex-end;\n}';

    assert.equal(result, expect);
  });

  // --------------------------

  it('Should return a flex container, with the content to' +
    ' left and top', () => {

    const ast = css.parse('.a{bnn-align: left top;}');

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  display: flex;\n  flex-wrap: wrap;\n  ' +
      'justify-content: flex-start;\n  align-items: flex-start;\n}';

    assert.equal(result, expect);
  });

  // --------------------------

  it('Should return a flex container, with the content to ' +
    'left and bottom', () => {

    const ast = css.parse('.a{bnn-align: left bottom;}');

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  display: flex;\n  flex-wrap: wrap;\n  ' +
      'justify-content: flex-start;\n  align-items: flex-end;\n}';

    assert.equal(result, expect);
  });

  // --------------------------

  it('Should return a flex container, with the content to right ' +
    'and top', () => {

    const ast = css.parse('.a{bnn-align: right top;}');

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  display: flex;\n  flex-wrap: wrap;\n  ' +
      'justify-content: flex-end;\n  align-items: flex-start;\n}';

    assert.equal(result, expect);
  });

  // --------------------------

  it('Should return a flex container, with the content to right and ' +
    'bottom', () => {

    const ast = css.parse('.a{bnn-align: right bottom;}');

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  display: flex;\n  flex-wrap: wrap;\n  ' +
      'justify-content: flex-end;\n  align-items: flex-end;\n}';

    assert.equal(result, expect);
  });

  // --------------------------

  it('Should return a flex container, with the content to center ' +
    'and bottom', () => {

    const ast = css.parse('.a{bnn-align: center bottom;}');

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  display: flex;\n  flex-wrap: wrap;\n  ' +
      'justify-content: center;\n  align-items: flex-end;\n}';

    assert.equal(result, expect);
  });

  // --------------------------

  it('Should return a flex container, with the content to right and ' +
    'center', () => {

    const ast = css.parse('.a{bnn-align: right center;}');

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule.declarations);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  display: flex;\n  flex-wrap: wrap;\n  ' +
      'justify-content: flex-end;\n  align-items: center;\n}';

    assert.equal(result, expect);
  });

});
