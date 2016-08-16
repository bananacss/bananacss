# Grid system
Abstraction for a powerful semantic grid system based in flexbox and calc().

## Summary

<hr>

## Syntax

```css
.foo {
  bnn-row: <lenght>; /* Container max-width */
}

.bar {
  bnn-col: <integer>/<integer> <lenght>; /* cols/total-of-cols gutter*/
}
```

<hr>

## Examples

### 12 cols grid system (gutter 5px)

Banana code:
```css
.row {
  bnn-row: 1000px;
}

.aside {
  bnn-col: 4/12 5px;
}
```

Generated CSS code:
```css
.row {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1000px;
  margin-right: auto;
  margin-left: auto;
}

.aside {
  width: calc(((100% * 4) / 12) - (5px * 2));
  margin-right: 5px;
  margin-left: 5px;
}
```

### 24 cols grid system (no gutters)

Banana code:
```css
.row {
  bnn-row: 1200px;
}

.aside {
  bnn-col: 2/24;
}
```

Generated CSS code:
```css
.row {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px;
  margin-right: auto;
  margin-left: auto;
}

.aside {
  width: calc(((100% * 2) / 24) - (0px * 2));
  margin-right: 0px;
  margin-left: 0px;
}
```
