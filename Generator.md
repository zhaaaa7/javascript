## Generator and iterator

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



## async and await
1. it is a syntax sugar for Generator which has a built-in "next()" execution
2. It has a clearer semantic meaning: "async" means there is aynchronous operation inside the function, "await" means you need to wait for the expression after the "=" to execute and return what is expected.

```javascript
function fn() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(30);
        }, 1000);
    })
}

// async function
const foo = async () => {
    const t = await fn();
    console.log(t); //30
    console.log('next code'); //'next code'
    return t+2;
}

foo();

foo().then(result=>console.log(result)); //32
```
3. async function returns a Promise object. If there is a return expression in the function `return a`, then the funtion returns the `Promise.resolve(a)`. Otherwise, `Promise.resolve(undefined)` is returned.

4.`await` waits for an expression, which could be a regular value or a resolved Promise object. `await` blocks the function execution. The variable is then assigned the value the Promise resloved to.
