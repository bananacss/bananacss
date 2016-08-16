# bnn-height

## Summary
The `bnn-height` property provide a `max-height` lenght for a 100% `height` element.

<hr>

## Syntax

```css
.foo {
  bnn-height: <length> | auto;
}
```

**Initial value:** auto

<hr>

## Examples

### Responsive container

Banana code:
```css
.foo {
  bnn-height: 900px;
}
```

Generated CSS code:
```css
.foo {
  height: 100%;
  max-height: 900px;
}
```

### Default value

Banana code:
```css
.foo {
  bnn-height: auto;
}
```

Generated CSS code:
```css
.foo {
  height: auto;
  max-height: none;
}
```
