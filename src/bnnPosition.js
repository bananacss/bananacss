const getParam = require('./getParam.js');
const addProperty = require('./addProperty.js');
const removeProperty = require('./removeProperty.js');

const bnnPosition = (declarations) => {

  declarations.forEach((declaration, index) => {

    if (declaration.property === 'bnn-position') {

      removeProperty(declarations, index);

      const propertyValue1 = getParam(declaration.value, 0);
      const propertyValue2 = getParam(declaration.value, 1);
      const propertyValue3 = getParam(declaration.value, 2);
      const propertyValue4 = getParam(declaration.value, 3);

      if (propertyValue1 === 'center') {
        addProperty(declarations, index, 'margin-right', 'auto');
        addProperty(declarations, index, 'margin-left', 'auto');
        addProperty(declarations, index, 'display', 'block');
      } else {
        addProperty(declarations, index, 'left', propertyValue4);
        addProperty(declarations, index, 'bottom', propertyValue3);
        addProperty(declarations, index, 'right', propertyValue2);
        addProperty(declarations, index, 'top', propertyValue1);
      }

    }

  });

};

module.exports = bnnPosition;
