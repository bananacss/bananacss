# bnn-size

## Summary
The `bnn-size` property provide a simple shothand for `width` and `height` properties.

<hr>

## Syntax

```css
.foo {
  bnn-size: <width> <height> | <size> | auto;
}
```

**Initial value:** auto

<hr>

## Examples

### Using the shorthand

Banana code:
```css
.foo {
  bnn-size: 50px 60px;
}
```

Generated CSS code:
```css
.foo {
  width: 50px;
  height: 60px;
}
```

### Only one value

Banana code:
```css
.foo {
  bnn-size: 100px;
}
```

Generated CSS code:
```css
.foo {
  width: 100px;
  height: 100px;
}
```

### Default value

Banana code:
```css
.foo {
  bnn-size: auto;
}
```

Generated CSS code:
```css
.foo {
  width: auto;
  height: auto;
}
```
