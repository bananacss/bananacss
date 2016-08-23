/**
 * Compile the bnn-align property values into flex align.
 * @module src/core/bnnAlign
 * @param {array} rule - Single CSS rule (AST)
 */

const bnnAlign = (rule) => {
  rule.findDeclarationsByProperty('bnn-align', (declaration, index) => {

    rule.removeDeclaration(index);

    const propertyHorizontal = declaration.getParam(0);
    const propertyVertical = declaration.getParam(1);

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
        rule.addDeclaration(property, value, index);
      }
    };

    const testHorizontal = (element) => {
      if (element.type === propertyHorizontal) {
        const property = element.declarations.property;
        const value = element.declarations.value;
        rule.addDeclaration(property, value, index);
      }
    };

    verticalValues.forEach(testVertical);
    horizontalValues.forEach(testHorizontal);

    rule.addDeclaration('flex-wrap', 'wrap', index);
    rule.addDeclaration('display', 'flex', index);

  });
};

module.exports = bnnAlign;
