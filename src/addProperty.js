const addProperty = (declarations, index, propertyName, propertyValue) => {

  declarations.splice(index, 0, {
    type: 'declaration',
    property: propertyName,
    value: propertyValue
  });

};

module.exports = addProperty;
