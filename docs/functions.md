# Functions

## Summary
Create reusable functions.

<hr>

## Syntax

```
@function functionName(arg1, arg2, arg3) {
  width: arg1;
  color: arg2;
  height: arg4;
}

.foo {
  bnn-function: functionName(<value>, <value>, <value>);
}
```

<hr>

## Examples

### Simple color variable

Banana code:
```
@function starWars(size, color) {
  width: size;
  color: color;
}

.foo {
  bnn-function: starWars(100%, #000);
}

.bar {
  bnn-function: starWars(50px, #fff);
}
```

Generated CSS code:
```
.foo {
  width: 100%;
  color: #000;
}

.bar {
  width: 50px;
  color: #fff;
}
```
