```javascript
function* read() {
    console.log(100);  //100
    let a = yield '200';
    console.log(a);   // 500
    let b = yield 300;
    console.log(b);  //'600'
    return b;
}
let it = read();
console.log(it.next('400')); //  { value: '200', done: false } 
console.log(it.next(500)); //  { value: '300', done: false } 
console.log(it.next('600')); // { value: '600', done: true } 
console.log(it.next('700')); //  { value: undefined, done: true } 
```


### rule:
1. it doesn't execute until you call next() 
2. `yield` pauses the execution of next, and returns an object
3. the value after `yield` is the value of the returned object
4. argument in the next() is assigned to the varible before the last `yield`
5. the `return` works like `yield` which returns a object `{value: '600', done: true}`
6. if the next() keeps on going, `{ value: undefined, done: true } `
