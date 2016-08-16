# bnn-box

## Summary
The `bnn-box` property provide a simple abstraction for the box model.

<hr>

## Syntax

```css
.foo {
  bnn-box: inside | outside
}
```

**Initial value:** outside

<hr>

## Examples

### Inside box model

Banana code:
```css
.foo {
  bnn-box: inside;
}
```

Generated CSS code:
```css
.foo {
  box-sizing: border-box;
}
```

### Outside box model

Banana code:
```css
.foo {
  bnn-box: outside;
}
```

Generated CSS code:
```css
.foo {
  box-sizing: content-box;
}
```
