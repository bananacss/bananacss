# bnn-width

## Summary
The `bnn-width` property provide a `max-width` lenght for a 100% `width` element.

<hr>

## Syntax

```css
.foo {
  bnn-width: <length> | auto;
}
```

**Initial value:** auto

<hr>

## Examples

### Responsive container

Banana code:
```css
.foo {
  bnn-width: 900px;
}
```

Generated CSS code:
```css
.foo {
  width: 100%;
  max-width: 900px;
}
```

### Default value

Banana code:
```css
.foo {
  bnn-width: auto;
}
```

Generated CSS code:
```css
.foo {
  width: auto;
  max-width: none;
}
```
