# Table of contents

- [bnn-size](#bnn-size)
- [bnn-position](#bnn-position)
- [bnn-gradient](#bnn-gradient)
- [bnn-align](#bnn-align)
- [bnn-width](#bnn-width)
- [bnn-height](#bnn-height)
- [Grid System](#grid-system)
- [Module Bundler](#module-bundler)
- [Variables](#variables)

## bnn-size

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

## bnn-position

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

## bnn-gradient

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
## bnn-align

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

## bnn-width

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

## bnn-height

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

## Grid System


*Banana code:*
```css
/* style.bnn */
.row {
  bnn-row: 1200px;
}

.col-x {
  bnn-col: 6/12 5px;
}

.col-y {
  bnn-col: 6/12 5px;
}

.col-z {
  bnn-col: 12/12 5px;
}
```

*Result:*
```css
/* style.css */
.row {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px;
  margin-right: auto;
  margin-left: auto;
}

.col-x {
  width: calc(((100% * 6) / 12) - (5px * 2));
  margin-right: 5px;
  margin-left: 5px;
}

.col-y {
  width: calc(((100% * 6) / 12) - (5px * 2));
  margin-right: 5px;
  margin-left: 5px;
}

.col-z {
  width: calc(((100% * 12) / 12) - (5px * 2));
  margin-right: 5px;
  margin-left: 5px;
}
```

*Example result:*
![Grid Results](grid.png)

<hr>

## Module Bundler

*Banana code:*

```css
/* module.bnn */
.demo {
  color: #000;
}
```

```css
/* style.bnn */
@import "module.bnn";

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
