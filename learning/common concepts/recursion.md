## recursion
```javascript
function factorial (n) {
  if (n < 2) {
    return 1;
  } else {
    return n * factorial(n-1);
  }
}
```

## Tail-recursive
```javascript
function factorial (n) {
  function fact(n, accumulator) {
    if (n < 2) {
      return acc;
    } else {
      return fact(n-1, n * accumulator);
    }
  }
  return fact(n, 1)
}
```
