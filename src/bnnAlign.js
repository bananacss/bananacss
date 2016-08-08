const getParam = require('./getParam.js');
const addProperty = require('./addProperty.js');
const removeProperty = require('./removeProperty.js');

/**
 * Compile the bnn-align property values into flex align.
 * @module src/bnnAlign
 * @param {array} declarations - Declarations list for a single CSS rule (AST)
 */
const bnnAlign = (declarations) => {

  declarations.forEach((declaration, index) => {

    if (declaration.property === 'bnn-align') {

      removeProperty(declarations, index);

      const propertyHorizontal = getParam(declaration.value, 0);
      const propertyVertical = getParam(declaration.value, 1);

      const horizontalValues = [
        { type: 'left',
          declarations: {
            property: 'justify-content',
            value: 'flex-start'
          }
        },
        { type: 'right',
          declarations: {
            property: 'justify-content',
            value: 'flex-end'
          }
        },
        { type: 'center',
          declarations: {
            property: 'justify-content',
            value: propertyHorizontal
          }
        }
      ];

      const verticalValues = [
        { type: 'top',
          declarations: {
            property: 'align-items',
            value: 'flex-start'
          }
        },
        { type: 'bottom',
          declarations: {
            property: 'align-items',
            value: 'flex-end'
          }
        },
        { type: 'center',
          declarations: {
            property: 'align-items',
            value: propertyVertical
          }
        }
      ];

      const testVertical = (element) => {
        if (element.type === propertyVertical) {
          const property = element.declarations.property;
          const value = element.declarations.value;
          addProperty(declarations, index, property, value);
        }
      };

      const testHorizontal = (element) => {
        if (element.type === propertyHorizontal) {
          const property = element.declarations.property;
          const value = element.declarations.value;
          addProperty(declarations, index, property, value);
        }
      };

      verticalValues.forEach(testVertical);
      horizontalValues.forEach(testHorizontal);

      addProperty(declarations, index, 'flex-wrap', 'wrap');
      addProperty(declarations, index, 'display', 'flex');

    }

  });

};

module.exports = bnnAlign;
