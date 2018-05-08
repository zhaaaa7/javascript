```javascript
function Person(name){
	this.name=name;
	this.age=10;
}


const amy=new Person();
console.log(amy); //Person {name: undefined, age:10}


console.log(Person.__proto__); // ƒ () { [native code] }
```



## Function object
1. The global Function object has no methods or properties of its own. However, since it is a function itself, it does inherit some methods and properties through the prototype chain from `Function.prototype`.
2. properties
* Function.arguments: Use the arguments object available within the function instead.
* Function.length: Specifies the number of arguments **expected** by the function.
* Function.prototype.constructor: Specifies the function that creates an object's prototype.
3. method
* Function.prototype.apply()
* Function.prototype.call()
* Function.prototype.bind()
* Function.prototype.toString() : Returns a string representing the source code of the function. Overrides the Object.prototype.toString method.

## prototype
1. It is a property that all function instance have.
2. Why we need a prototype object? To share the properties and methods among instances.

## `.__proto__`
1. It is a property that all object have.
2. It is the reference to the prototype object of its own contructor function.


## prototype chain
1. Suppose we have a `A constructor` and its prototype object is `instance b` that created by `B constructor`, then the `instance a` can access `B's prototype`.
```javascript
function A(){
    
}
function B(){
    
}
var b = new B();
A.prototype = b;
var a = new A();
console.log(a.__proto__===b);//true
console.log(a.__proto__.__proto__===B.prototype) //true
console.log(a.__proto__.__proto__.__proto__===Object.prototype) //true
```


## native object (independent of the agent)
1. types of native object
* Object,Function,Array,String,Boolean,Number
* Date,RegExp,Error,EvalError,RangeError,ReferenceError,SyntaxError,TypeError,URIError.

2. native objects are function constructor
```
typeof(Object)
typeof(Array)
typeof(Date)
typeof(RegExp)
typeof(Math) 

//all of them are function
```

```
var obj = new Object();
var foo = new Foo();
```

<img src="https://github.com/zhaaaa7/javascript/blob/master/img/prototypeChain.jpg" width="800px" alt="prototype chain">
