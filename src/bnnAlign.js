const getParam = require('./getParam.js');

let bnnAlign = (declarations) => {

  // Search for declarations
  declarations.forEach((declaration, index) => {

    // Find a custom property
    if (declaration.property === "bnn-align") {

      // Delete a custom property
      declarations.splice(index, 1);

      //Filter values
      const propertyHorizontal = getParam(declaration.value, 0);
      const propertyVertical = getParam(declaration.value, 1);

      const horizontalValues = [
        { type: "left",
          declarations: {
            type: 'declaration',
            property: 'justify-content',
            value: 'flex-start'
          }
        },
        { type: "right",
          declarations: {
            type: 'declaration',
            property: 'justify-content',
            value: 'flex-end'
          }
        },
        { type: "center",
          declarations: {
            type: 'declaration',
            property: 'justify-content',
            value: propertyHorizontal
          }
        }
      ];
      const verticalValues = [
        { type: "top",
          declarations: {
            type: 'declaration',
            property: 'align-items',
            value: 'flex-start'
          }
        },
        { type: "bottom",
          declarations: {
            type: 'declaration',
            property: 'align-items',
            value: 'flex-end'
          }
        },
        { type: "center",
          declarations: {
            type: 'declaration',
            property: 'align-items',
            value: propertyVertical
          }
        }
      ];
      // Add properties and values
      declarations.push({
        type: 'declaration',
        property: 'display',
        value: "flex"
      });

      declarations.push({
        type: 'declaration',
        property: 'flex-wrap',
        value: "wrap"
      });

      const testHorizontal = (element) => {
        if (element.type === propertyHorizontal) {
          declarations.push(element.declarations);
        }
      };
      const testVertical = (element) => {
        if (element.type === propertyVertical) {
          declarations.push(element.declarations);
        }
      };
      horizontalValues.forEach(testHorizontal);
      verticalValues.forEach(testVertical);
    }
  });

};

module.exports = bnnAlign;
