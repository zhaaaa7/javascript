1.
```js
function F1() {
    var a = 100;
    return function () {
        console.log(a);
    }
}
function F2(f1) {
    var a = 200;
    console.log(f1()); //100
}
var f1 = F1();
F2(f1);
```


2. 
```js
g = 10;
function f() {
    g = 20;
    var h = 10;
}
f();
console.log(g);
```
