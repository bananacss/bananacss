# Variables

## Summary
Compile the native [CSS custom property syntax](https://www.w3.org/TR/css-variables/) into static values.

<hr>

## Syntax

```css
:root {
  --customProperty: #ffe400;
}

.foo {
  background-color: var(--customProperty);
}
```

<hr>

## Examples

### Simple color variable

Banana code:
```css
:root {
  --highlight: #ffe400;
}

.foo {
  background-color: var(--highlight);
}
```

Generated CSS code:
```css
.foo {
  background-color: #ffe400;
}
```
