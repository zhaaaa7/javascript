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
