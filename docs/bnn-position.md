# bnn-position

## Summary
The `bnn-position` property provide a simple shothand for `top`, `right`, `bottom` and `left` properties or center a block element with `margins`.

<hr>

## Syntax

```css
.foo {
  bnn-position: <top> <right> <bottom> <left> | center;
}
```

<hr>

## Examples

### Using the shorthand

Banana code:
```css
.foo {
  bnn-position: 5px 10px 0 0;
}
```

Generated CSS code:
```css
.foo {
  top: 5px;
  right: 10px;
  bottom: 0;
  left: 0;
}
```

### Center a block element

Banana code:
```css
.foo {
  bnn-position: center;
}
```

Generated CSS code:
```css
.foo {
  display: block;
  margin-right: auto;
  margin-left: auto;
}
```
