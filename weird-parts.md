## scoping
var -- function scope, cannot be accessed just outside the function
let -- block scope
### hoisting -- lexical scoping, things defined outside are available inside







## conversion

```javascript
let x=2+'2';   // '22'
x=2+2+'2';   // '42'
x=2+true;   // 3
x=2+true+'2';   // '33'
x=2+Number('2');   // 4'
x=Number('hello');   // NaN
x=typeof(x); //number
Boolen(null, undefined, 0, '') ===> false
```
