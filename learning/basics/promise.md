1.
```js
const sleep = delay => {
  return new Promise((resolve, reject) => {
    setTimeout(_ => resolve(), delay);
  })
}

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
结果
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


```js
const sleep = delay => {
  return new Promise((resolve, reject) => {
    setTimeout(_ => resolve(), delay);
  })
}

const task = (i) => {
    return new Promise(async (resolve, reject) => {
      await sleep(500)         
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
})
```
结果
```
Promise {<pending>}__proto__: Promise[[PromiseStatus]]: "resolved"[[PromiseValue]]: undefined
VM20092:15 now is 0
VM20092:18 now is 1
VM20092:21 now is 2
VM20092:24 now is 3
```


2. 
```js

const fakeDatabase = {
    todos: [{
        id: 1,
        text: 'hey',
        completed: true,
    }, {
        id: 2,
        text: 'ho',
        completed: true,
    }, {
        id: 3,
        text: 'let’s go',
        completed: false,
    }],
};

const delay = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

const fetchTodos = () =>
    delay(500).then(() => fakeDatabase.todos);

console.log(fetchTodos().then((val) => {
    console.log(val);
}));
```
```
Promise {<pending>}
__proto__: Promise
[[PromiseStatus]]: "resolved"
[[PromiseValue]]: undefined


(3) [{…}, {…}, {…}]
0: {id: 1, text: "hey", completed: true}
1: {id: 2, text: "ho", completed: true}
2: {id: 3, text: "let’s go", completed: false}
length: 3
```

### Promise.resolve
```
let p1=new Promise(...);
let p=Promise.resolve(p1);

p===p1;//true
```

1. 
```js
var pro4, pro3;
setTimeout(() => {
    console.log('1');
    setTimeout(() => {
        console.log('hahha');
    }, 1000);

    const pro = new Promise((resolve, reject) => {
        resolve('2');
    });
    console.log('resolved', pro);
    pro.then(val => {
        console.log('???', val);
    }).then(() => {
        console.log('interrupt');
    });

    const pro2 = Promise.resolve('3');
    console.log('resolved2', pro2);
    pro2.then(val => {
        console.log('???', val);
    });

    pro3 = new Promise((resolve, reject) => {
        fetch('https://jsonplaceholder.typicode.com/users/2').then(response => resolve('wait'))
    });
    console.log('pending', pro3);
    pro3.then(val => {
        console.log(val);
    });



    pro4 = new Promise((resolve, reject) => {
        console.log('!!!');
    });

    console.log('dead', pro4);

}, 1000);


setTimeout(() => {
    console.log('4');
    const pro = Promise.resolve('5');

    pro.then(val => {
        console.log(val);
    });
}, 1000);

setTimeout(() => {console.log(123);  });

const p = Promise.resolve(
    new Promise(resolve => {
        setTimeout(() => { resolve('p'); console.log(55); }, 1000);
        new Promise(resolve => { resolve('p1'); }).then(r => console.log(r));
    })
);

setTimeout(() => { console.log(456); });

p.then(r => console.log(r));
```
```
p1
VM10936:52 123
VM10936:61 456

进入setTimeout-1000
VM10936:3 1
VM10936:11 resolved Promise {<resolved>: "2"}
VM10936:19 resolved2 Promise {<resolved>: "3"}
VM10936:27 pending Promise {<pending>}
VM10936:35 !!!
VM10936:38 dead Promise {<pending>}
VM10936:13 ??? 2
VM10936:21 ??? 3
VM10936:15 interrupt
VM10936:44 4
VM10936:48 5
VM10936:56 55
VM10936:63 p
VM10936:29 wait

进入setTimeout-2000
VM10936:5 hahha
```
