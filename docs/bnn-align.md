# bnn-align

## Summary
The `bnn-align` property provide a aligned flex container.

<hr>

## Syntax

```css
.foo {
  bnn-align: [right | center | left] [top | center | bottom] | center;
}
```

<hr>

## Examples

### Horizontal and vertical centered container

Banana code:
```css
.foo {
  bnn-align: center; /* == center center*/
}
```

Generated CSS code:
```css
.foo {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
```

### Center and bottom container alignment

Banana code:
```css
.foo {
  bnn-align: center bottom;
}
```

Generated CSS code:
```css
.foo {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-end;
}
```

### Right and top container alignment

Banana code:
```css
.foo {
  bnn-align: right top;
}
```

Generated CSS code:
```css
.foo {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: flex-start;
}
```
