const getParam = require('./getParam.js');
const addProperty = require('./addProperty.js');
const removeProperty = require('./removeProperty.js');

const bnnWidth = (declarations) => {

  declarations.forEach((declaration, index) => {

    if (declaration.property === 'bnn-width') {

      removeProperty(declarations, index);

      const propertyWidth = getParam(declaration.value, 0);

      addProperty(declarations, index, 'max-width', propertyWidth);
      addProperty(declarations, index, 'width', '100%');

    }

  });

};

module.exports = bnnWidth;
