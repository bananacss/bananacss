/**
 * Add a property in specific position in the declarations list.
 * @module src/helpers/addProperty
 * @param {array} declarations - Declarations list for a single CSS rule (AST)
 * @param {number} index - Position for include the declaration on deaclarations
 * @param {string} propertyName - Property name for include
 * @param {string} propertyValue - Property value for include
 */
const addProperty = (declarations, index, propertyName, propertyValue) => {

  declarations.splice(index, 0, {
    type: 'declaration',
    property: propertyName,
    value: propertyValue
  });

};

module.exports = addProperty;
