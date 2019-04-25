1.
```js
const sleep = delay => {
  return new Promise((resolve, reject) => {
    setTimeout(_ => resolve(), delay);
  })
}
```

```js
const task = (i) => {
  return new Promise(async (resolve, reject) => {
    await sleep(500);
    console.log(`now is ${i}`);
    ++i;
    resolve(i);
  })
}

[task, task, task, task].reduce(async (prev, task) => {
  console.log(prev);
  const res = await prev;
  return task(res);
}, 0);
```

```js
const task = (i) => {
    return new Promise(async (resolve, reject) => {
      await sleep(500)         
      i++
      resolve(i)
    })
}

task(0).then((param)=>{
    console.log(`now is ${param}`);
    return task(1);
}).then((param)=>{
    console.log(`now is ${param}`);
    return task(2);
}).then((param)=>{
    console.log(`now is ${param}`);
    return task(3);
}).then((param)=>{
    console.log(`now is ${param}`);
    return task(4);
})
```
```
0
Promise {<pending>}__proto__: Promise[[PromiseStatus]]: "resolved"[[PromiseValue]]: 1
Promise {<pending>}__proto__: Promise[[PromiseStatus]]: "resolved"[[PromiseValue]]: 2
Promise {<pending>}__proto__: Promise[[PromiseStatus]]: "resolved"[[PromiseValue]]: 3
Promise {<pending>}__proto__: Promise[[PromiseStatus]]: "resolved"[[PromiseValue]]: 4

now is 0
now is 1
now is 2
now is 3
```
