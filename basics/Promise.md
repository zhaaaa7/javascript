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


*******




2. async call -- async will not blocking the execution
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
