# bananacss

> :banana: A brazilian css superset.

[![Build Status](https://travis-ci.org/bananacss/bananacss.svg?branch=master)](https://travis-ci.org/bananacss/bananacss)
[![Dependency Status](https://david-dm.org/bananacss/bananacss.svg)](https://david-dm.org/bananacss/bananacss)
[![devDependency Status](https://david-dm.org/bananacss/bananacss/dev-status.svg)](https://david-dm.org/bananacss/bananacss#info=devDependencies)

## Table of contents

- [How to install](#how-to-install)
  - [Command Line](#command-line)
  - [Module](#module)
- [Command Line Usage](#command-line-usage)
- [Module Usage](#module-usage)
- [Custom properties available](#custom-properties-available)
  - [bnn-size](#bnn-size)
  - [bnn-position](#bnn-position)
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
$ npm install bananacss
```

<hr>

## Command Line Usage

*Compile you .bnn file to .css*

```sh
$ banana <input_path>
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
const banana = require('bananacss'),
    path = 'somePath/file.bnn';

/* Output the css. */
let output = banana.render(path);
```

<hr>

## Custom properties available

### bnn-size
.style.bnn [input]
```css
.demo {
  bnn-size: 50px 100px;
}
```

.style.css [output]
```css
.demo {
  width: 50px;
  height: 100px;
}
```

### bnn-position
.style.bnn [input]
```css
.demo {
  bnn-position: 10px 5px 8px 90px;
}
```

.style.css [output]
```css
.demo {
  top: 10px;
  right: 5px;
  bottom: 8px;
  left: 90px;
}
```

<hr>

## Tests

### Run the unit tests

```sh
$ npm test
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
