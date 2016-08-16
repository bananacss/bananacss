# bnn-gradient

## Summary
The `bnn-gradient` property provide a simple vertical or horizontal background gradient.

<hr>

## Syntax

```css
.foo {
  bnn-gradient: <color> <color> [vertical | horizontal];
}
```

<hr>

## Examples

### Simple gradient

Banana code:
```css
.foo {
  bnn-gradient: #000 #fff;
}
```

Generated CSS code:
```css
.foo {
  background-image: linear-gradient(to bottom, #000, #fff);
}
```

### Vertical gradient

Banana code:
```css
.foo {
  bnn-gradient: #000 #fff vertical;
}
```

Generated CSS code:
```css
.foo {
  background-image: linear-gradient(to bottom, #000, #fff);
}
```

### Horizontal gradient

Banana code:
```css
.foo {
  bnn-gradient: #000 #fff horizontal;
}
```

Generated CSS code:
```css
.foo {
  background-image: linear-gradient(to left, #000, #fff);
}
```
