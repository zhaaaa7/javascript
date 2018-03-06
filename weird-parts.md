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
    * IIFE can affect global variable

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



```javascript


```

```javascript


```

```javascript


```

```javascript


```

```javascript


```

```javascript


```

```javascript


```
