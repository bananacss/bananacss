/**
 * Remove a property in specific position in the declarations list.
 * @module src/removeProperty
 * @param {array} declarations - Declarations list for a single CSS rule (AST)
 * @param {number} index - Declaration position for remove from declarations
 */
const removeProperty = (declarations, index) => {

  declarations.splice(index, 1);

};

module.exports = removeProperty;
