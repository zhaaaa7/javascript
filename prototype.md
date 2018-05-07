```javascript
function Person(name){
	this.name=name;
	this.age=10;
}


const amy=new Person();
console.log(amy); //Person {name: undefined, age:10}


console.log(Person.__proto__); // ƒ () { [native code] }
```
