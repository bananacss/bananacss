/**
 * Get a especific value from a shorthand
 * @module src/getParam
 * @param {string} declarationValue - Shorthand value of a declaration
 * @param {number} paramPosition - Position for returned value
 */
const getParam = (declarationValue, paramPosition) => {

  const declarationValues = declarationValue.split(' ');

  if (declarationValues[paramPosition]) {
    return declarationValues[paramPosition];
  } else {
    return declarationValues[0];
  }

};

module.exports = getParam;
