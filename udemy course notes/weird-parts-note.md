Notes of https://www.udemy.com/understand-javascript/learn/v4/overview.

## Conceptual concepts
1. Syntax parser: convert/translate your code to computer instructions. It is part of interpreter/compiler.It has assumptions and rules. For example, t knows 'function' is special and needs specific way of translation. 
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/1.PNG" alt="1" width="500px"/>

1-1. white space -- be ignored by syntax parser

<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/33.PNG" alt="33" width="500px"/>

2. Lexical environment: where you code is written is important, it determines how they sit in the memory. Where the function is physically declared.
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/2.PNG" alt="2" width="500px"/>

3. Execution context: which bits of code is actually running
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/3.PNG" alt="3" width="500px"/>
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/7.jpeg" alt="7" width="500px"/>

4. object is a  collection of name/value pairs
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/4.PNG" alt="4" width="500px"/>
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/5.PNG" alt="5" width="500px"/>

5. global environment(execution context): create a global object and 'this' for you.

<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/6.PNG" alt="6" width="500px"/>

```
In the browser window object is the gloabl object and this=== window object. Global variables are attached to the global object.

const a='global'
console.log(window.a); //global
```

6. Creation phase: before your code is executed line by line, all variable signs up space in memory with a value of “undefined”, while function declaration save all the codes there.
```
undefined: a key word/special value which means the variable is declared but the value has not been set, 
a===undefined   //not a string, no “”
usually initially set by js engine (not programmer)
```
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/8.PNG" alt="8" width="500px"/>

### hoisting 
```javascript
b();
console.log(a); //undefined

var a = 'Hello World!';
function b() {
    console.log('Called b!');
}
```
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/9.PNG" alt="9" width="500px"/>

7. execution phase: runs the code line by line
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/9-1executionphase.jpeg" alt="9-1" width="500px"/>


8. single threaded / synchronous: one line a time
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/10.PNG" alt="10" width="500px"/>

9. asynchronous callbacks: besides the js engine, there many other engines running in the browser
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/17.PNG" alt="17" width="500px"/>

10. event queue: is watched by js engine and see if any function should be run after the execution stack is empty
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/18event-queue2.png" alt="18" width="800px"/>



## Scoping

1. Invocation: run a function by using ()

2. Execution stack: every time a function is called, a new execution context is created and stacked on the execution stack and will be popped off the stack when finished. It will have its own space for variables.
```
var c; is executed after b() is popped off
```
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/10-0execution-stack.png" alt="10-0" width="700px"/>


3. Variable environment: where the variable is created and lives and how it relates to others
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/11.PNG" alt="11" width="500px"/>

```javascript
//each myVar lives in their own environment / execution context
function b() {
	var myVar;
	console.log(myVar); 
}

function a() {
	var myVar = 2;
	console.log(myVar);
	b(); 
}

var myVar = 1;
console.log(myVar); 
a(); 
console.log(myVar); 
//1 2 undefined 1
```

<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/11-1variable-environment.jpeg" alt="11-1" width="500px"/>

4. Scope chain: reference to outer environment (lexical environment)

```javascript
function b() {
	console.log(myVar); 
}

function a() {
	var myVar = 2;
	b(); 
}

var myVar = 1;
a(); 
//1 
```
In b(), myVar is initially undefined

<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/12.PNG" alt="12" width="500px"/>

But b is created when the global environment is created, so b has a reference to outer environment,  lexical environment, b is declared in the global environment -- where b is physically sitting.

<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/13.PNG" alt="13" width="500px"/>

This is scope chain.

<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/14.PNG" alt="14" width="500px"/>

Change the lexical environment of b to a. b is created when a is executed.

```javascript
function a() {   
    function b() {
        console.log(myVar);
    }    
    myVar=2;
	b();
}

var myVar = 1;
a(); 
//2
```

<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/15.PNG" alt="15" width="500px"/>

5. scope: where a variable is available
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/16.PNG" alt="16" width="500px"/>

```
let allows block scoping. Temporary Dead Zone make 'let' variables sits in the memory but not allowed to be 
used until the execution phase
```

## Types

1. Dynamic typing

<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/19.PNG" alt="19" width="500px"/>

2. Primitive type: 6, represents a single value 

* undefined: lack of existence, set by js engine
* null: set by programmers
* boolean
* number: floating point number, there is always decimals
* string
* symbol

<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/20.PNG" alt="20" width="500px"/>

## Operators
1. operator: are functions (infix notation): 

```javascript
3+4 ;

//in js engin
function +(a,b){
	return a+b;
}

+(3,4);
```
2-1. operator precedence: 

Higher one get called first
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/21.PNG" alt="21" width="500px"/>

2-2. operator associativity: right-to-left(right) / left-to-right(left)
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/22.PNG" alt="22" width="500px"/>

```javascript
// = , right-to-left
var a=2, b=3, c=4;
a=b=c;
console.log(a,b,c); // 4 4 4
```
precedence determines which function run first? when they have same precedence, associativity determines the order.

3. coercion 

<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/23.PNG" alt="23" width="500px"/>

```
“+” coerce number to string 

“<” coerce others to number
```

```javascript
 let x=2+'2';   // '22'
 x=2+2+'2';   // '42'
 x=2+true;   // 3
 x=2+true+'2';   // '33'
 x=2+Number('2');   // 4'
 x=Number('hello');   // NaN
 x=typeof(x); //number

```

4. comparison operator: 

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness

```javascript
console.log(1<2<3); //true
console.log(3<2<1); //true, 3<2=false, to compare it with 1, coerced to ===> 0, 0<1
```
4-1. comparison without coersion: ===, !==

```javascript
false == 0;  //true
null == 0; //false
null < 1; //true
```
```
object.is solves (-0,+0) (NaN, NaN)
Boolen(null, undefined, 0, '') ===> false
Number (null, false) ===>0
Numbr (undefined) ==NaN
```

5. existence 

```javascript
var a=false;
if (a) {....}
```

6. default value
```javascript
function greet(name){
	console.log('hello'+name);
}	
//coerce undefined to string 'undefined'
greet(); // hello undefined
```
```javascript
function greet(name) {
    name = name || '<Your name here>';
    console.log('Hello ' + name);    
}
greet('Tony'); // hello tony
greet(); // hello <Your name here>
```
"||" is common in popular frameworks checking if the name us used in global environment
```javascript
Window.varName=Window.varName||'same varName'
```

# Object

1. Objects has properties and methods. It sits in the memory and has reference to other things in the memory(property, methods)
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/24.PNG" alt="24" width="500px"/>

```javascript
//object literal
const person={};

//member access operator, faster
person.name='tony';

//computed member access operator
const age='age';
person[age]=20;
```

```javascript
function greet(person){	
	console.log('hi'+person.name);
}

//create an object on the fly
greet({name:'tony',age:3});
```
2. Namespace: 
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/25.PNG" alt="25" width="500px"/>

js doesn’t have namespace, but object can work as a container, i.e the space

```javascript
const english={};
const spanish={};
english.greet='hello';
spanish.greet='hola';

```

3. JSON and Object literal: JSON is more strict

javascript object notation is a string, requiring “” around property name, 

```
//object literal
const obj={name:'tony',age:3};
JSON.stringify(obj);

//JSON string
const json='{
	'name':'tony',
	'age':3
}';
JSON.parse(json);
```
        	
## Functions -- first class functions

<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/26.PNG" alt="26" width="500px"/>

1. Functions are objects so they have properties and methods, 

```javascript
function greet(){
	console.log('hi');
}
greet.language='english';
console.log(greet.language); //english
```

However, they have some special properties that make the special such as name (optional) and code (the actual lines of code you write), which is invokable.

<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/27.PNG" alt="27" width="500px"/>

```
code property is the actual lines of code you write. So thinking function as a container of the code, it has other properties.
```

<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/28.PNG" alt="28" width="500px"/>

2-1. Expression: results a value of anything: object, function…..
        	
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/29.PNG" alt="29" width="500px"/>

```
//when you enter in the console
a=3; //3
1+2; //3
b={name:'tony'}
```

2-2. Statement/declaration: just sit in the memory

```
if(a===3){  }
cannot  a=if(a===3){  } because it doesn't result a value
```
2-3. function expression and statement

function statement

```javascript
function greet(name) {
    console.log('Hello ' + name);   
}
greet('John');
```

function expression creates a function object

```javascipt
var greetFunc = function(name) {
    console.log('Hello ' + name);
};
greetFunc('John');
```

<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/29-1expression-and-statement.png" alt="29-1" width="800px"/>

* hoisting

```javascript
greet();
function greet() {
    console.log('hi');   
} 

//error, function expression can't be hoisted, just the variale is hoisted
//the function as a object is assigned to the variable in later execution stage
anonymousGreet(); //undefined is not a function
var anonymousGreet = function() {
    console.log('hi');   
}


```
3-1. By value: copy the value, primitives, new space in memory, no influence on each other
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/30.PNG" alt="30" width="500px"/>

3-2. By reference: point to the same address, no new space in memory, 
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/31.PNG" alt="31" width="500px"/>

All objects works by reference -- change together, even as parameters
```
let obj1={greeting:'hello'}
let obj2=obj1;
function changeObj(obj){ 
  obj.greeting='Hola';
}
changeObj(obj1);
console.log(obj2.greeting); // Hola

//equal operator will stop such association, setting up a new memory space
obj1={greeting:'hi'};
console.log(obj2.greeting); //Hola
```

4. arguments is a keyword, array-like data structure 

<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/32.PNG" alt="32" width="500px"/>

if not passing arguments

```javascript
function greet(name) {
    console.log('Hello ' + name);    
}
greet(); // 'Hello undefined', coerced to string
```

```
function greeting(a,b,c){
	console.log(arguments);
	if(arguments.length===0){
		console.log('missing arguments');
	}
}
greeting(); //[]
greeting(a,b); //[a,b]
greeting(a,b,c); //[a,b,c]
```

4-1. spread is now replacing it
```javascript
function greeting(a,b,...other){
	console.log(arguments);
	if(arguments.length===0){
		console.log('missing arguments');
	}
}
```
5. function overloading

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


6. IIFE -- immediately invoked function expression, executing function on the fly. But if you don’t invoke it immediately, it will disappear. 
Because expressions can just sit in the memory, 

```javascript
//create a function on the fly and immediately invoke it
var greeting = function(name) {   
    return 'Hello ' + name;    
}('John');

 // greeting holds the string, not the function
console.log(greeting);  // Hello John
```
To let js engine see a function statement as an expression, add ( ) operator, because if a line begins with 'function', js see it as function statement. While for (), js sees things inside () as expression, so you just create a function object on the fly inside ().

```javascript
var firstname = 'John';
(function(name) {    
    var greeting = 'Inside IIFE: Hello';
    console.log(greeting + ' ' + name);    
}(firstname)); 
```

6-1. safe code

```javascript
(function(name) {
    var greeting='hello';
    console.log( greeting + name);    
}('John'));
```
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/34.PNG" alt="34" width="500px"/>

No variable collision
```javascript
var greeting='Hola';
(function(name) {
    var greeting='hello';
    console.log( greeting + name);   // hello John
}('John')); 
```
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/35.PNG" alt="35" width="500px"/>

6-2. However, IIFE can affect global variable

```javascript
(function(global, name) {    
    var greeting = 'Hello';
    global.greeting = 'Hello'; //affect the global object
    console.log(greeting + ' ' + name);    
}(window, 'John')); // IIFE

console.log(greeting); //Hello
```

7. Closure -- closing in all the variables that it is supposed to have access to
Return a function that can have access to the variables in the outer function,.
```javascript
function greet(whattosay){
	return function(name){
		console.log(whattosay+' '+name);
	}
}
greet('hi')('tony');
```

js engin will keep all of the variables of the outer execution context somewhere in the memory even after the outer function execution context is popped off.  

<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/36closure.png" alt="36" width="900px"/>

7-1. surprise!
```javascript
function buildFunctions() { 
    var arr = [];    
    for (var i = 0; i < 3; i++) {        
        arr.push(          //push 3 function objects into an array, not executing them
            function() {
                console.log(i);   
            }
        )        
    }    
    return arr;
}

var fs = buildFunctions();  //push 3 function objects into an array and return the array as value to the var fs
console.log(fs);  //[ [Function], [Function], [Function] ]

//closed by i=3, it is the same for all 3 functions when they are invoked, lexical environment
fs[0](); //3
fs[1](); //3
fs[2](); //3

```

<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/37.PNG" alt="37" width="500px"/>
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/38.PNG" alt="38" width="500px"/>

To preserve the i for each turn

```javascript
function buildFunctions2() { 
    var arr = [];    
    for (var i = 0; i < 3; i++) {
    	//in es6, can use let j=i
        arr.push(                   //push the result of IIFE which is a function
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
fs2[0](); //0
fs2[1](); //1
fs2[2](); //2
```

7-2. function factories 

```javascript
function makeGreeting(language) { 
    return function(firstname, lastname) {     
        if (language === 'en') {
            console.log('Hello ' + firstname + ' ' + lastname);   
        }
        if (language === 'es') {
            console.log('Hola ' + firstname + ' ' + lastname);   
        }        
    }   
}


// greetEnglish is a function, whose closure points to 'language == english' which is kept in the first excution context
var greetEnglish = makeGreeting('en'); 
var greetSpanish = makeGreeting('es');

greetEnglish('John', 'Doe'); //still has access to language
greetSpanish('John', 'Doe');
```
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/39-1function-factory.jpeg" alt="39" width="500px"/>

Every time you call the function, you get a new execution context, so each inner function has different closing variable.

<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/39.PNG" alt="39" width="500px"/>

8. Callback: “I call you, and you call the callback function”.
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/40.PNG" alt="40" width="500px"/>

```javascript
function sayHiLater(){
	var greeting="Hi"; //closure
	setTimeOut(function(){console.log(greeting)},3000);
}
sayHiLater();
```

9. call, apply, bind -- controls what “this” ends up being in the function 
They are methods of all function objects, use the function as objects so don’t call them (by adding parentheses)

<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/40.1call-apply-bind.jpeg" alt="40" width="500px"/>


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
    console.log('Logged: ' + this.getFullName()); // this ===> window
    console.log('Arguments: ' + lang1 + ' ' + lang2);
    console.log('-----------');    
}
```

* bind -- create a copy of function with specified 'this'

```javascript
var logName = function(lang1, lang2) {
    console.log('Logged: ' + this.getFullName()); // this ===> person
    console.log('Arguments: ' + lang1 + ' ' + lang2);
    console.log('-----------');    
}.bind(person);
logName(); // John Doe undefined undefined
```

```javascript
var logPersonName = logName.bind(person); // create a copy of function logname, and assign person as the "this"
logPersonName('en'); // John Doe en undefined
```

* call and apply -- executes the function

```javascript
//call and apply executes the function, and specifying what "this" is as the first argument, the difference is apply accepts an array of arguments
logName.call(person, 'en', 'es'); // John Doe en es
logName.apply(person, ['en', 'es']);
```
IIFE

```javascript
(function(lang1, lang2) {
    console.log('Logged: ' + this.getFullName());
    console.log('Arguments: ' + lang1 + ' ' + lang2);
    console.log('-----------');    
}).apply(person, ['es', 'en']);   // John Doe en es
```

9-1. usage

* function borrowing

```javascript
var person = {
    firstname: 'John',
    lastname: 'Doe',
    getFullName: function() {        
        var fullname = this.firstname + ' ' + this.lastname;
        return fullname;        
    }
}

var person2 = {
    firstname: 'Jane',
    lastname: 'Doe'
}
// use the method defined in person in person2
console.log(person.getFullName.apply(person2)); //Jane Doe
```

* function currying

<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/40.2function-currying.jpeg" alt="40" width="500px"/>

```javascript
function multiply(a, b) {
    return a*b;   
}

var multipleByTwo = multiply.bind(this, 2); // set the permanent value of a when copy is made
console.log(multipleByTwo(4)); //8
```

10. functional programming

```javascript
function mapForEach(arr, fn) {    
    var newArr = [];
    for (var i=0; i < arr.length; i++) {
        newArr.push(
            fn(arr[i])   //change each element using the passed function
        )
    };     
    return newArr; // return something new, not chaning the original array
}

var arr1 = [1,2,3];
console.log(arr1);
```

```javascript
var arr2 = mapForEach(arr1, function(item) {
   return item * 2; 
});
console.log(arr2); //[2,4,6]


var arr3 = mapForEach(arr1, function(item) {
   return item > 2; 
});
console.log(arr3); //[false,false,true]
```

```javascript
var checkPastLimit = function(limiter, item) {
    return item > limiter;    
} 

var arr4 = mapForEach(arr1, checkPastLimit.bind(this, 1)); //set limiter==1
console.log(arr4); //[false,true,true]
```

```javascript
var checkPastLimitSimplified = function(limiter) {
    return function(limiter, item) {
        return item > limiter;   
    }.bind(this, limiter);                         
    //create a function with limiter preset
};

var arr5 = mapForEach(arr1, checkPastLimitSimplified(1)); // returns a function expression that has the bind call on it
console.log(arr5); //[false,true,true]
```


## 'this' keyword

1. In global environment -- window
```javascript
console.log(this);  //Window
```

2. In function -- window

```javascript
function a(){
	console.log(this); //Window
	this.newVar='hello'
}

const b=function(){
	console.log(this); //Window
};
a();  
b();
console.log(newVar);  //attach a new property 'newVar' to Window object
```

3. In object method  -- instance

```javascript
var c={
	name: 'name',
	log: function(){
		console.log(this); //obejct the method sitting inside of
		this.name='updated name';
	}
};

c.log(); // Object {...c}

```

4. In funtion in object method -- the global object
```javascript

var d={
	name: 'name',
	log: function{
		console.log(this); //obejct the method sitting inside of
		this.name='updated name';
		
		var setName=function(newname){
			this.name=newname; // the global object
		};
		setName('new name'); 
		console.log(this); // obejct the method sitting inside of
	}
};

d.log(); //updated name

```
solution: objects are set by reference, self=this

```javascript

var d={
	name: 'name',
	log:function(){
		var self=this; //solution 
		
		self.name='updated name';
		console.log(self);
		
		var setName=function(newname){
			self.name=newname;
		};
		setName('new name'); 
		console.log(self); 
	}
};

d.log(); 

```

## Array -- collection of anything

```javascript
const myArr=[1,'hello',{name:'tony'},function(){}];
```

## Prototypal inheritance

1. inheritance: one object gets access to the properties and methods of another object

<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/42.PNG" alt="42" width="500px"/>

2. prototype chain

__proto__: is a property that all objects in js have, it is simple an reference to another object (the prototype). 
```javascript
const a={};
const b=function(){};
const c=[];

a.__proto__ === Object {};
b.__proto__ === function Empty(){};
c.__proto__ === [];
```

__proto__ It is the special reference that says where to look for more properties and methods that not in me. Here forms a prototype chain.

<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/43.PNG" alt="43" width="500px"/>

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
john.__proto__ = person; 
// assign person as the prototype of john, so can use the methods in person
console.log(john.getFullName());  //John Doe
console.log(john.firstname);  //John, first look at john object not person object
```

search along up the prototype chain
```javascript
var jane = {
    firstname: 'Jane'   
}
jane.__proto__ = person;
console.log(jane.getFullName()); // Jane Default
//"this" refers to jane first because it calls the methods, then it searches along the prototype chain

```

3. reflection and extend: 

* reflection: an object can look at itself and change anything

<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/44.PNG" alt="44" width="500px"/>

```javascript
//get everthing along the prototype chain
for (var prop in john){
	console.log(prop+': '+ john[prop]);
}
//firstname: 'John',
//lastname: 'Doe'
// getFullName: function() {return this.firstname + ' ' + this.lastname;}
```
to get what's on the object itself

```javascript
//get own property
for (var prop in john){
	if(john.hasOwnProperty(prop)){
	console.log(prop+': '+ john[prop]);
	}
}
```

* extend

```javascript
var amy={
	address: 'buioofm'
	};
var extended=Object.assign(amy,person);
```
## building objects

1. object literal

2. via function constructors and 'new' keyword. 

* function constructors: normal function that is used to construct objects

* new: new is an operator/keyword. What happens : 1)an empty object is created, 2)then constructor function is invoked, 3)change “this” to point to the brand new, empty object, 4)and finally, returns the new object.

```javascript
function Person(firstname, lastname) {
    console.log(this); // Person {}, the empty object
    this.firstname = firstname;
    this.lastname = lastname;
    console.log('This function is invoked.'); 
    // no return here !!!!!
}

var john = new Person('John', 'Doe'); //"this" points to john
console.log(john); //Person {....};
```

```javascript
console.log(john.__proto__); // {constructor: ƒ Person}
```


* .prototype is a (empty) object property of the constructor function. It is not the prototype of the function
```javascript
console.log(Person.__proto__); // ƒ () { [native code] }
```

It is the prototype (.__proto__) of any object that is created by the constructor function. This is where the methods live, to save memory, while properties live inside the constructor.

<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/45.PNG" alt="45" width="500px"/>

```javascript
function Person(firstname, lastname) {
 
    console.log(this);
    this.firstname = firstname;
    this.lastname = lastname;
    console.log('This function is invoked.');
    
}

//add methods to the empty .prototype property of the constructor function
Person.prototype.getFullName = function() { 
    return this.firstname + ' ' + this.lastname;   
}

var john = new Person('John', 'Doe');
console.log(john); //has a getFullName method automatically

//add another method
Person.prototype.getFormalFullName = function() {
    return this.lastname + ', ' + this.firstname;   
}

console.log(john.getFormalFullName());

console.log(john.__proto__)  //{getFullName: ƒ, getFormalFullName: ƒ, constructor: ƒ}
```

2-1. missing new will cause 'undefined' objects because function constructor has no explicit return

2-2. built-in function constructors

Primitive types has their__proto__ property that refers to their prototype that has all the built-in methods and attributes

```javacript
//primitive constructor, returns an object that contains the primitive value
var a = new Number(3);
var b = new String('hello');
b.length

//string primitives can use methods on the prototype
'hello'.length
```

you can change the built-in type constructor .prototype

```javascript
String.prototype.isLengthGreaterThan = function(limit) {
    return this.length > limit;  //"this" points to the specific object
}
console.log("John".isLengthGreaterThan(3)); // true


Number.prototype.isPositive = function() {
    return this > 0;   
}

3.isPositive(); //error, because js engin can't coerce number primitive into number object
var a = new Number(3); 
a.isPositive(); //true
```

danger!!! be careful when using built-in constructors!!
```javascript
var a=3;
var b=Number(3);
a===b; //false
```

don't use 'for...in' in array because it is object in essence, may get property in the prototype chain!
```javascript
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

3. Object.create() and pure prototype inheritance

```javascript
//base object
var person = {
    firstname: 'Default',
    lastname: 'Default',
    greet: function() {
        return 'Hi ' + this.firstname;   
        // "this" is needed because object doesn't create new execution environment
        //otherwise js will come to the global object to finc firstname property
    }
};

var john = Object.create(person);
console.log(john); //Object {...person}, 
console.log(john.__proto__); // Object person

//overwrite the properties
john.firstname = 'John';
john.lastname = 'Doe';
console.log(john);

```
3-1. Polyfill: codes that adds feature that engine lacks
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/46.PNG" alt="46" width="500px"/>

```javascript
if (!Object.create) {
  //get a object that becomes the prototype of an empty constructor function
  Object.create = function (o) {
    if (arguments.length > 1) {
      throw new Error('Object.create implementation'
      + ' only accepts the first parameter.');
    }
    function F() {}
    F.prototype = o; //set o as the prototype of an empty object
    return new F(); 
  };
}
```
## weird 
1. typeof and instanceof
```javascript
var a = 3;
console.log(typeof a); // number

var b = "Hello";
console.log(typeof b); //strinf

var c = {};
console.log(typeof c); //object

var z = function() { };
console.log(typeof z);  //function
```

array

```javascript
var d = [];
console.log(typeof d); // object, weird!
console.log(Object.prototype.toString.call(d)); // [object Array],better!
```

function constructor

```javascript
function Person(name) {
    this.name = name;
}

var e = new Person('Jane');
console.log(typeof e);  //object
console.log(e instanceof Person); // true, if exists in the prototype chain
```

undefined and null
```javascript
console.log(typeof undefined); // undefined, makes sense
console.log(typeof null);  // object, a bug since, like, forever...
```

## Some tips ...
1. Boolean(undefined/null/‘’)=false to check existence in if()
2. Create an object on the fly: funcA({prop1:’value1’,prop2:’value2’})
3. JSON.stringify(object), JSON.parse(json)
4. When a function is invoked, a new execution context is created.
5. ‘this’ will be decided by where the func is and how it is called. ‘this’ => global object (Window ), if you just create and call a function, still ‘Window’
6. For a method, ‘this’ is the object the method sitting inside of. There is a problem with inside methods functions, to deal with it use self.this because objects are set by reference
7. Variable scope chain: outer environment
8. “function literal”, like object literal that is created on the fly
Control what “this” points to and are methods of function objects
9. Bind creates a copy of a function with an object as “this” in the original function. Apply and call calls the function, but apply requires array [    ]
10. To build a new object, create a object, give it properties and methods, and set the prototype.
11. There is no return in constructor function.
12. Moment.js to deal with data https://momentjs.com

