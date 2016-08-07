# Banana CSS

> :banana: The brazilian CSS superset.

[![Build Status](https://travis-ci.org/bananacss/bananacss.svg?branch=master)](https://travis-ci.org/bananacss/bananacss)
[![Coverage Status](https://coveralls.io/repos/github/bananacss/bananacss/badge.svg?branch=master)](https://coveralls.io/github/bananacss/bananacss?branch=master)
[![Dependency Status](https://david-dm.org/bananacss/bananacss.svg)](https://david-dm.org/bananacss/bananacss)
[![devDependency Status](https://david-dm.org/bananacss/bananacss/dev-status.svg)](https://david-dm.org/bananacss/bananacss#info=devDependencies)
[![npm](https://img.shields.io/npm/v/bananacss.svg)](https://www.npmjs.com/package/bananacss)
[![npm](https://img.shields.io/npm/dt/bananacss.svg)](https://www.npmjs.com/package/bananacss)

## Table of contents

- [How to install](#how-to-install)
  - [Command Line](#command-line)
  - [Module](#module)
- [Command Line Usage](#command-line-usage)
- [Module Usage](#module-usage)
- [Custom properties available](#custom-properties-available)
  - [bnn-size](#bnn-size)
  - [bnn-position](#bnn-position)
  - [bnn-gradient](#bnn-gradient)
  - [bnn-align](#bnn-align)
  - [bnn-width](#bnn-width)
  - [bnn-height](#bnn-height)
- [Module Bundler](#module-bundler)
  - [@import](#@import)
- [Variables](#variables)
  - [Custom properties](#custom-properties)
- [Code Style](#code-style)
- [Tests](#tests)
- [Versioning](#versioning)
- [Contributing](#contributing)
- [History](#history)
- [License](#license)

<hr>

## How to install

Verify if you have [node](http://nodejs.org/) and [npm](https://www.npmjs.org/) installed.

#### Command Line

```sh
$ npm install -g bananacss
```

#### Module

```sh
$ npm install bananacss --save
```

<hr>

## Command Line Usage

*Compile you .bnn file to .css*

```sh
$ banana <input_path>
```

*Watch for changes.*

```sh
$ banana <input_path> -w
```

*Output to dir when passing files.*

```sh
$ banana <input_path> -o <out_path>
```

*Show the project version.*

```sh
$ banana --version
```

*Show all available commands.*

```sh
$ banana --help
```

<hr>

## Module Usage

```js
const bnnCode = '.a {bnn-size: 50px;}';

// features injection
const config = {};
config.bnnSize = require('./bnnSize.js'),
config.bnnPosition = require('./bnnPosition.js'),
config.bnnGradient = require('./bnnGradient.js'),
config.bnnAlign = require('./bnnAlign.js');

const Banana = require('banana')(config);

/* Output the css. */
let output = Banana.render("./fake_path.bnn", bnnCode);
```

<hr>

## Custom properties available

### bnn-size

*Banana code:*
```css
/* style.bnn */
.demo {
  bnn-size: 50px 100px;
}
```

*Result:*
```css
/* style.css */
.demo {
  width: 50px;
  height: 100px;
}
```

### bnn-position

*Banana code:*
```css
/* style.bnn */
.demo {
  bnn-position: 10px 5px 8px 90px;
}
```

*Result:*
```css
/* style.css */
.demo {
  top: 10px;
  right: 5px;
  bottom: 8px;
  left: 90px;
}
```

*Banana code:*
```css
/* style.bnn */
.demo {
  bnn-position: center;
}
```

*Result:*
```css
/* style.css */
.demo {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
```

### bnn-gradient

*Banana code:*
```css
/* style.bnn */
.demo {
  bnn-gradient: #f9e400 #ff9c00 vertical;
}
```

*Result:*
```css
/* style.css */
.demo {
  background-image: linear-gradient(to bottom, #f9e400, #ff9c00);
}
```
### bnn-align

*Banana code:*
```css
/* style.bnn */
.demo {
  bnn-align: center center;
}
```

*Result:*
```css
/* style.css */
.demo {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
```

*Banana code:*
```css
/* style.bnn */
.demo {
  bnn-align: right bottom;
}
```

*Result:*
```css
/* style.css */
.demo {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: flex-end;
}
```

<hr>

### bnn-width

*Banana code:*
```css
/* style.bnn */
.demo {
  bnn-width: 300px;
}
```

*Result:*
```css
/* style.css */
.demo {
  width: 100%;
  max-width: 300px;
}
```

<hr>

### bnn-height

*Banana code:*
```css
/* style.bnn */
.demo {
  bnn-height: 300px;
}
```

*Result:*
```css
/* style.css */
.demo {
  height: 100%;
  max-height: 300px;
}
```

<hr>

## Module Bundler

### @import

*Banana code:*

```css
/* module.bnn */
.demo {
  color: #000;
}
```

```css
/* style.bnn */
@import module.bnn;

.exemplo {
  background: #fff;
}
```

*Result:*
```css
/* style.css */
.demo {
  color: #000;
}

.exemplo {
  background: #fff;
}
```
<hr>

## Variables

### Custom properties

*Banana code:*

```css
/* style.bnn */
:root {
  --x: #fff;
}

.exemplo {
  background: var(--x);
}
```

*Result:*
```css
/* style.css */

.exemplo {
  background: #fff;
}
```

<hr>

## Code Style

Follow the [Banana NodeJS style guide](https://github.com/bananacss/banana-style-guide).

*Validate the code style with ESLint:*
```sh
$ npm run eslint
```

<hr>

## Tests

*Run the unit tests with mocha:*
```sh
$ npm test
```

*Calculate the coverage with Istanbul:*
```sh
$ npm run cover
```

<hr>

## Versioning

To keep better organization of releases we follow the [Semantic Versioning 2.0.0](http://semver.org/) guidelines.

## Contributing

Find on our [issues](https://github.com/bananacss/bananacss/issues/) the next steps of the project ;)
<br>
Want to contribute? [Follow these recommendations](https://github.com/bananacss/bananacss/blob/master/CONTRIBUTING.md).

## History

See [Releases](https://github.com/bananacss/bananacss/releases) for detailed changelog.

## License

[MIT License](https://github.com/bananacss/bananacss/blob/master/LICENSE.md) © [Afonso Pacifer](http://afonsopacifer.com/)
