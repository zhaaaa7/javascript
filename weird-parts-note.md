## conceptual concepts
1. Syntax parser: convert/translate your code to computer instructions. It knows 'function' is special and needs specific way of translation. It is part of interpreter/compiler.
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/1.PNG" alt="1" width="500px"/>

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

## scoping

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

But b has a reference to outer environment, lexical environment, b is declared in the global environment -- where b is physically sitting.
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/13.PNG" alt="13" width="500px"/>

This is scope chain.
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/14.PNG" alt="14" width="500px"/>

Change the lexical environment of b.
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

* scope: where a variable is available
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/16.PNG" alt="16" width="500px"/>

* asynchronous callbacks: many other engines running in the browser
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/17.PNG" alt="17" width="500px"/>

* event queue: is watched by js engine and see if any function should be run after the execution stack is empty
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/18.PNG" alt="18" width="500px"/>

* Dynamic typing
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/19.PNG" alt="19" width="500px"/>

* Primitive type: represents a single value: undefined (lack of existence), null (set by programmers), boolean, number, string, symbol
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/20.PNG" alt="20" width="500px"/>

* Operator: are functions (infix notation): 3+4 / +(3,4)
Operator precedence: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/21.PNG" alt="21" width="500px"/>

* Operator associativity: right-to-left
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/22.PNG" alt="22" width="500px"/>

* Coercion: “+” coerce number to string 1+’2’=’12’
		   “<” coerce others to number, Number(false)=0, Number(undefined)=NaN, Number(null)=0
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/23.PNG" alt="23" width="500px"/>

* Objects sit in the memory and have reference to other things in the memory (property, methods)
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/24.PNG" alt="24" width="500px"/>

* Namespace: js doesn’t have, object can work as a container to 
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/25.PNG" alt="25" width="500px"/>

* Functions are objects, first class functions, properties and methods, has special properties such as name (optional) and code (invokable, container)
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/26.PNG" alt="26" width="500px"/>
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/27.PNG" alt="27" width="500px"/>
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/28.PNG" alt="28" width="500px"/>

* Expression: results a value (when you enter in the console) of anything: object, function…..
        Statement/declaration: just sit in the memory	
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/29.PNG" alt="29" width="500px"/>

* By value: copy the value, primitives, new space in memory
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/30.PNG" alt="30" width="500px"/>

* By reference: point to the same address, change together, even as parameters
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/31.PNG" alt="31" width="500px"/>

* arguments is a keyword, array-like data structure, spread is now replacing it
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/32.PNG" alt="32" width="500px"/>

* 
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/33.PNG" alt="33" width="500px"/>

* IIFE: immediately invoked function expression. Expressions can just sit in the memory, to let js engine see a function statement as an expression, add ( ). But if you don’t invoke it immediately, it will disappear. Executing function on the fly.
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/34.PNG" alt="34" width="500px"/>
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/35.PNG" alt="35" width="500px"/>

* Closure: return a function that can have access to the variables in the outer function, js engin will retain all of them even after the outer function execution context is cleared
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/36.PNG" alt="36" width="500px"/>
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/37.PNG" alt="37" width="500px"/>
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/38.PNG" alt="38" width="500px"/>
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/39.PNG" alt="39" width="500px"/>

* Callback functions: “I call you and you call the callback”.
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/40.PNG" alt="40" width="500px"/>

* call, apply, bind are methods of all function objects, use the function as objects so don’t call them (by adding parentheses), they controls what “this” is in the function

* inheritance. __proto__: is a property that all objects in js have, it is simple an reference to another object (the prototype). I have the special reference that says where to look for more properties and methods that not in me.
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/41.PNG" alt="41" width="500px"/>
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/42.PNG" alt="42" width="500px"/>

* prototype chain
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/43.PNG" alt="43" width="500px"/>

* Reflection: an object can look at itself and change anything
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/44.PNG" alt="44" width="500px"/>

* .prototype is a (empty) object property of the constructor function. It is the prototype of any object that is created by the constructor function. This is where the methods live, which properties live inside the constructor.
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/45.PNG" alt="45" width="500px"/>

* Polyfill: codes that adds feature that engine lacks
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/screenshots/46.PNG" alt="46" width="500px"/>
