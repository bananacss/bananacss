# Contributing rules

*1 - Fork it!*

*2 - Clone*

*3 - Create your feature branch:*
```sh
$ git checkout -b my-new-feature
```
*4 - Write your feature unit tests*

*5 - Create your feature following the [code style](https://github.com/bananacss/bananacss#code-style) rules (Valid your code with ESLint) and document with [jsdocs](http://usejsdoc.org/index.html) syntax:*

Module documented with jsdocs example:

```js
/**
 * Module description
 * @module moduleName
 * @param {string} paramName - Param description
 */
const moduleName = (param) => {
  console.log(param)
};

module.exports = moduleName;
```

*Validate with eslint*

```sh
$ npm run eslint
```

*6 - Run the unit tests and calculate the coverage:*
```sh
$ npm test
```

```sh
$ npm run cover
```

*7 - Commit your changes:*
```sh
$ git commit -m 'Add some feature'
```

*8 - Push to the branch:*
```sh
$ git push origin my-new-feature
```

*6 - Submit a pull request*
