# Module bundler

## Summary
Compile the native `@import` syntax to single CSS file.

<hr>

## Syntax

```css
@import "foo.bnn";
```

<hr>

## Examples

### Module import

Banana code:
```css
/* module.bnn */
.foo {
  color: #000;
}
```

```css
/* style.bnn */
@import "module.bnn";

.bar {
  background: #fff;
}
```

Generated CSS code:
```css
/* style.css */
.foo {
  color: #000;
}

.bar {
  background: #fff;
}
```
