let getParam = (declarationValue, paramPosition) => {

  let declarationValueArray = declarationValue.split(" ");

  if (declarationValueArray[paramPosition]) {
    return declarationValueArray[paramPosition];
  } else {
    return declarationValueArray[0];
  }

}

module.exports = getParam;
