## concepts
1. Promise is an object
```javascript

const p1=Promise.resolve(1);
console.log(p1);  // Promise {}

const p2 = new Promise((resolve,reject)=>{
	resolve(p1);   
});

console.log(p2); // Promise {}
//still a new promise. just has the same value as p1

console.log(p1===p2); //false

p2.then(value=>{
	console.log(value);  // 1
});

```

2. When we resolve/settle a promise, we have the value which becomes the value of the promise

```javascript
const promise1=new Promise(function(resolve,reject){
  //cleaning the room

  const isClean=false;

  if(isClean){
    resolve('cleaned');
  }else{
    reject('not cleaned');
  }
});

promise1.then(function(formResolve){
  console.log(formResolve);
}).catch(function(fromReject){
  console.log(fromReject);
});   // not cleaned
```
3. dependency among mutiple Promise
```javascript
const promise1=function(){
  return new Promise(function(resolve,reject){
    resolve('promise1');
  });
};

const promise2=function(p){
  return new Promise(function(resolve,reject){
    resolve(p+' promise2');
  });
};

const promise3=function(p){
  return new Promise(function(resolve,reject){
    resolve(p+' promise3');
  });
};

promise1().then(function(result){
  return promise2(result);
}).then(function(result){
  return promise3(result);
}).then(function(result){
  console.log('done',result); //done promise1 promise2 promise3
});
```

3. Promise.all and Promise.race
```javascript
Promise.all([promise1,promise2,promise3]).then(function(){
  console.log('all done');
});


Promise.race([promise1,promise2,promise3]).then(function(){
  console.log('one done');
});
```









## advanced
1. async call -- async will not blocking the execution
```javascript
const step1 = function () {
  let val = 1;
  console.log(`this is step1 , the value is ${val}`); //this is step1 , the value is 1

  if (val > 0){
    return Promise.resolve(val);
  }
  return Promise.reject(val);
}

const step2 = function (val) {
  val += 1;
  console.log(`this is step2 , the value is ${val}`); // this is step2 , the value is 2
  return Promise.resolve(val);
}

const step3 = function (val) {
  val += 1;
  console.log(`this is step3 , the value is ${val}`); //this is step3 , the value is 3
  return Promise.resolve(val);
}

let steps = [step1, step2, step3];
```

```javascript
steps.reduce((promise, fn, index)=>{
  console.log(index);
  return promise.then((val)=>{   // return Promise.resolve().then(val=>step1(val))
    return fn(val);
  })
  
}, Promise.resolve());  // provide initialValue


//another solution
async function foo () {
  let val;
  for (let i = 0; i < steps.length; i++) {
    if (i===0) {
      val = await steps[i]();
    }else {
      val = await steps[i](val);
    }
  }
}
foo();
```

## async
await is like `promise.then()`

https://github.com/baiyuze/notes/issues/8

```js
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}
console.log('script start');
setTimeout(function() {
  console.log('setTimeout');
}, 0);
async1();
new Promise(function(resolve) {
  console.log('promise1');
  resolve();
}).then(function() {
  console.log('promise2');
});

console.log('script end');

//VM420:9 script start
//VM420:2 async1 start
//VM420:7 async2
//VM420:15 promise1
//VM420:21 script end
//VM420:4 async1 end
//VM420:18 promise2


//VM420:11 setTimeout
```
