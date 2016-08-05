const getParam = (declarationValue, paramPosition) => {

  const declarationValues = declarationValue.split(' ');

  if (declarationValues[paramPosition]) {
    return declarationValues[paramPosition];
  } else {
    return declarationValues[0];
  }

};

module.exports = getParam;
