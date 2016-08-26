const assert = require('assert');
const css = require('css');
const addIterations = require('css-ast-iterations');
const bnnAlign = require('../src/core/bnnAlign.js');

describe('bnnAlign()', () => {

  // --------------------------

  it('Should return a vertical and horizontal centralized flex container' +
    'with one value', () => {

    const ast = css.parse('.a{bnn-align: center;}');
    addIterations(ast);


    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule);
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
    addIterations(ast);

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  display: flex;\n  flex-wrap: wrap;\n  ' +
      'justify-content: center;\n  align-items: center;\n}';

    assert.equal(result, expect);
  });

  // --------------------------

  it('Should return a flex container aligned to left with one value', () => {

    const ast = css.parse('.a{bnn-align: left;}');
    addIterations(ast);

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  display: flex;\n  flex-wrap: wrap;\n  ' +
      'justify-content: flex-start;\n}';

    assert.equal(result, expect);
  });

  // --------------------------

  it('Should return a flex container aligned to right with one value', () => {

    const ast = css.parse('.a{bnn-align: right;}');
    addIterations(ast);

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule);
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
    addIterations(ast);

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule);
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
    addIterations(ast);

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule);
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
    addIterations(ast);

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule);
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
    addIterations(ast);

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule);
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
    addIterations(ast);

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule);
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
    addIterations(ast);

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule);
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
    addIterations(ast);

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule);
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
    addIterations(ast);

    ast.stylesheet.rules.forEach((rule) => {
      if (rule.selectors) bnnAlign(rule);
    });

    const result = css.stringify(ast);
    const expect = '.a {\n  display: flex;\n  flex-wrap: wrap;\n  ' +
      'justify-content: flex-end;\n  align-items: center;\n}';

    assert.equal(result, expect);
  });

});
