## hoisting
```javascript
b();
console.log(a);

var a = 'Hello World!';
function b() {
    console.log('Called b!');
}
```

## scope chain / lexical
```javascript
function b() {
	console.log(myVar);
}

function a() {
	var myVar = 2;
	b();
}

var myVar = 1;
a(); //1
```
```javascript
function a() {   
    function b() {
        console.log(myVar);
    }    
	b();
}

var myVar = 1;
a(); //1
```
## this keyword

```javascript
console.log(this);  //Window
```

In function
```javascript
function a(){
	console.log(this);
	this.newVar='hello'
}
a();  //Window
console.log(newVar);  //attach a new property to Window object

```


In object method
```javascript
var c={
	name: 'name',
	log(){
		console.log(this); //obejct the method sitting inside of
		this.name='updated name';
	}
};

c.log();

```

In funtion in object method
```javascript
//bug in es5

var d={
	name: 'name',
	log(){
		//const self=this; //solution objects are set by reference
		console.log(this); //obejct the method sitting inside of
		this.name='updated name';
		var setName=function(newname){
			this.name=newname;
		};
		setName('new name'); // the global object
		console.log(this); // obejct the method sitting inside of
	}
};

d.log();

```
* bind
```javascript
var person = {
    firstname: 'John',
    lastname: 'Doe',
    getFullName: function() {
        
        var fullname = this.firstname + ' ' + this.lastname;
        return fullname;
        
    }
}

var logName = function(lang1, lang2) {

    console.log('Logged: ' + this.getFullName());
    console.log('Arguments: ' + lang1 + ' ' + lang2);
    console.log('-----------');
    
}

var logPersonName = logName.bind(person); // create a copy of function logname and assign person as the "this"
logPersonName('en');
```
* call and apply

```javascript
//call and apply executes the function instead by specifying what "this" is as the first argument
logName.call(person, 'en', 'es');
logName.apply(person, ['en', 'es']);

(function(lang1, lang2) {

    console.log('Logged: ' + this.getFullName());
    console.log('Arguments: ' + lang1 + ' ' + lang2);
    console.log('-----------');
    
}).apply(person, ['es', 'en']);

```
* function borrowing
```javascript
    // function borrowing
var person2 = {
    firstname: 'Jane',
    lastname: 'Doe'
}

console.log(person.getFullName.apply(person2)); // use the method in person in person2
```
* function currying
```javascript
    function multiply(a, b) {
    return a*b;   
}

var multipleByTwo = multiply.bind(this, 2); // set the permanent value
console.log(multipleByTwo(4));
```

## function
* function expression and statement
```javascript
// function statement
function greet(name) {
    console.log('Hello ' + name);   
}
greet('John');

// using a function expression
var greetFunc = function(name) {
    console.log('Hello ' + name);
};
greetFunc('John');
```

```javascript
greet();
function greet() {
    console.log('hi');   
}

//error, function expression can't be hoisted
anonymousGreet();
var anonymousGreet = function() {
    console.log('hi');   
}


```
* if not passing arguments
```javascript
function greet(name) {
    console.log('Hello ' + name);    
}
greet(); // 'Hello undefined', coerced to string
```
* default value in ES5
```javascript
function greet(name) {
    name = name || '<Your name here>';
    console.log('Hello ' + name);    
}

greet('Tony');
greet();
```
"||" is common in popular frameworks checking if the name us used in global environment
```javascript
Window.varName=Window.varName||'same varName'
```
* function overloading

```javascript
function greet(firstname, lastname, language) {
        
    language = language || 'en';
    
    if (language === 'en') {
        console.log('Hello ' + firstname + ' ' + lastname);   
    }
    
    if (language === 'es') {
        console.log('Hola ' + firstname + ' ' + lastname);   
    }
    
}

function greetEnglish(firstname, lastname) {
    greet(firstname, lastname, 'en');   
}

function greetSpanish(firstname, lastname) {
    greet(firstname, lastname, 'es');   
}

greetEnglish('John', 'Doe');
greetSpanish('John', 'Doe');

```
* Immediately Invoked Function Expression (IIFE) 

```javascript
var greeting = function(name) {
    
    return 'Hello ' + name;
    
}('John');

console.log(greeting); // greeting holds the string, not the function

// IIFE
var firstname = 'John';

(function(name) {
    
    var greeting = 'Inside IIFE: Hello';
    console.log(greeting + ' ' + name);
    
}(firstname)); 

```
IIFE can affect global variable

```javascript
(function(global, name) {
    
    var greeting = 'Hello';
    global.greeting = 'Hello';
    console.log(greeting + ' ' + name);
    
}(window, 'John')); // IIFE

console.log(greeting);

```
* closure

```javascript
function buildFunctions() {
 
    var arr = [];
    
    for (var i = 0; i < 3; i++) {
        
        arr.push(
            function() {
                console.log(i);   //push 3 function objects into an array
            }
        )
        
    }
    
    return arr;
}

var fs = buildFunctions(); //push 3 function objects into an array and return the array as value to the var fs
console.log(fs)//[ [Function], [Function], [Function] ]

//closed by i=3, it is the same for all 3 functions when they are invoked
fs[0]();
fs[1]();
fs[2]();

```
to overcome it 
```javascript

function buildFunctions2() {
 
    var arr = [];

    
    for (var i = 0; i < 3; i++) {
    	//in es6, can use let j=i
        arr.push(
            (function(j) {
                return function() {
                    console.log(j);   //closed by j which has different value in each turn
                }
            }(i))
        )
        
    }
    
    return arr;
}

var fs2 = buildFunctions2();

fs2[0]();
fs2[1]();
fs2[2]();
```

## object
* prototype

```javascript

var person = {
    firstname: 'Default',
    lastname: 'Default',
    getFullName: function() {
        return this.firstname + ' ' + this.lastname;  
    }
}

var john = {
    firstname: 'John',
    lastname: 'Doe'
}

// don't do this EVER! for demo purposes only!!!
john.__proto__ = person; // assign person as the prototype of john
console.log(john.getFullName());
console.log(john.firstname);

var jane = {
    firstname: 'Jane'   
}

jane.__proto__ = person;
console.log(jane.getFullName()); // Jane Default
//"this" refers to jane first because it calls the methods, then it searches along the prototype chain

person.getFormalFullName = function() {
    return this.lastname + ', ' + this.firstname;   
}

console.log(john.getFormalFullName());
console.log(jane.getFormalFullName());
```

* building an object
```javascript
function Person(firstname, lastname) {
 
    console.log(this); // Person {}, the empty object
    this.firstname = firstname;
    this.lastname = lastname;
    console.log('This function is invoked.');
    
}

var john = new Person('John', 'Doe'); //"this" points to john
console.log(john);

//set property
console.log(john.__proto__); // Persson {}

```
* .prototype
```javascript
function Person(firstname, lastname) {
 
    console.log(this);
    this.firstname = firstname;
    this.lastname = lastname;
    console.log('This function is invoked.');
    
}

Person.prototype.getFullName = function() { //add methods to the empty .prototype of the constructor function
    return this.firstname + ' ' + this.lastname;   
}

var john = new Person('John', 'Doe');
console.log(john); //has a getFullName method automatically


Person.prototype.getFormalFullName = function() {
    return this.lastname + ', ' + this.firstname;   
}

console.log(john.getFormalFullName());

```
you can change the built-in type constructor .prototype
```javascript
String.prototype.isLengthGreaterThan = function(limit) {
    return this.length > limit;  //"this" points to the specific object
}

console.log("John".isLengthGreaterThan(3));


Number.prototype.isPositive = function() {
    return this > 0;   
}
//3.isPositive() is wrong because js engin can't coerce number primitive into number object
//var a = new Number(3), a.isPositive()


//don't use for...in in array because it is object in essence
Array.prototype.newprop='new!';
var arr=['a','b','c'];
for (var prop in arr){
	console.log(prop+':'+arr[prop]);
}
//0:a
//1:b
//2:c
//3:new!

```
* pure prototypal inheritance
polyfill
```javascript
if (!Object.create) {
  Object.create = function (o) {
    if (arguments.length > 1) {
      throw new Error('Object.create implementation'
      + ' only accepts the first parameter.');
    }
    function F() {}
    F.prototype = o;
    return new F(); //set o as the prototype of an empty object
  };
}


```

```javascript

var person = {
    firstname: 'Default',
    lastname: 'Default',
    greet: function() {
        return 'Hi ' + this.firstname;   
        // "this" is needed because object doesn'r create new execution environment
        //otherwise js will come to the global object to finc firstname property
    }
};

var john = Object.create(person);
john.firstname = 'John';
john.lastname = 'Doe';
console.log(john);

```
* typeof and instanceof
```javascript
var a = 3;
console.log(typeof a);

var b = "Hello";
console.log(typeof b);

var c = {};
console.log(typeof c);

var d = [];
console.log(typeof d); // object, weird!
console.log(Object.prototype.toString.call(d)); // [object Array],better!

function Person(name) {
    this.name = name;
}

var e = new Person('Jane');
console.log(typeof e); //object
console.log(e instanceof Person); // true, if exists in the prototype chain

console.log(typeof undefined); // undefined, makes sense
console.log(typeof null); // object, a bug since, like, forever...

var z = function() { };
console.log(typeof z); //function

```
