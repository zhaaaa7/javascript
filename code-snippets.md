### object
```javascript
var passengers = [ 
{ name: "Jane Doloop", paid: true ,ticket:"coach"}, 
{ name: "Dr. Evel", paid: true ,ticket:"firstclass"},
{ name: "Sue Property", paid: false,ticket:"firstclass" }, 
{ name: "John Funcall", paid: true,ticket:"coach" } ];

function printPassengers(passengers) {
	for (var i = 0; i < passengers.length; i++) {
	console.log(passengers[i].name);
	//return false; 
	}
	return true; 
}

printPassengers(passengers);

function createDrinkOrder(passenger) {
	var orderFunction;
	if (passenger.ticket === "firstclass") {
		orderFunction=function(){
			console.log("first class");
		};
	} else {
		orderFunction=function(){
			console.log("not first class");
		};
	}
        return orderFunction;
}
createDrinkOrder(passengers[0])(); //not first class
```

### add property on the fly
```javascript
const b={};
console.log(b.add); //undefined
```

### Object.assign
```javascript
var receiver = {}, 
supplier = { 
	get name() {
		return "file.js" 
		} 
	}; 
Object.assign(receiver, supplier);
console.log(receiver);
var descriptor = Object.getOwnPropertyDescriptor(receiver, "name"); 
console.log(descriptor.value); // "file.js"  
console.log(descriptor.get); // undefined 
```

### Object.getPrototypeOf
```javascript
let person = {
    getGreeting() {
        return "Hello";
    }
};

let friend = {
    getGreeting() {
        return Object.getPrototypeOf(this).getGreeting() + ", hi!";
    }
};

// set prototype to person
Object.setPrototypeOf(friend, person);
console.log(friend.getGreeting());                      // "Hello, hi!"
console.log(Object.getPrototypeOf(friend) === person);  //true
```

### destructuring
```
let node = {
        type: "Identifier",
        name: "foo",
        loc: {
            start: {
                line: 1,
                column: 1
            },
            end: {
                line: 1,
                column: 4
            }
        }
    };

let { loc: { start }} = node;

console.log(start.line); // 1
```

### variable scope
```javascript
var justAVar = "Oh, don't you worry about it, I'm GLOBAL"; 
function whereAreYou() {
	var justAVar = "Just an every day LOCAL";
	function inner() { 
		return justAVar;
	}	
	return inner;
}

var innerfunction=whereAreYou();
var result=innerfunction();
console.log(result); // Just an every day LOCAL
```

###  reverse string
```javascript
function reverseString(str) {
  str_list=str.split('');
  str_list.reverse();
  console.log(str_list);
  new_str=str_list.join('');
  return new_str;
}

reverseString("hello");
```


### closure
```javascript
function sandwichMaker(magicIngredient) { 
	function make(filling) {
		return magicIngredient + " and " + filling; 
		}
	return make; 
}
var hamAnd = sandwichMaker("ham");
console.log(hamAnd("cheese")); //harm and cheese
```


```javascript
function wrapElements(a) {
	var result = [], i, n;
	for (i = 0, n = a.length; i < n; i++) {
		result[i] = function() { return [i,a[i]]; }; 
		console.log(i);//0,1,2
	}
return result; 
}
var wrapped = wrapElements([10,12,13]); 
console.log(wrapped);//[[f],[f],[f]]
var f = wrapped[0];
console.log(f()); // [3,undefined]
```

```javascript
function f(){
  var a = [];
  var i;
  for (i = 0; i < 3; i++){
    a[i] = (function(x){
      return function(){
        return x;
      }
    })(i);
  }
  return a;
  }

var a = f();
a[0]();// 0
a[1]();// 1
a[2]();// 2

// another version
function f(){
  function aa(x){
    return function(){
      return x;  
    }
  }
  var a = [];
  var i;
  for (i = 0; i < 3; i++){
   	a[i] = aa(i);
  }
  return a;
 } 

var a = f();
a[0](); //0
a[1](); //1
a[2](); //2
```


### function contructor
```javascript
function NothingSpecial() {
	console.log( "Don't mind me!" );
}

var a = new NothingSpecial(); // "Don't mind me!"

a; //  NothingSpecial {}
```

### RegExp
```
function CSVReader(separators) { 
	this.separators = separators || [","]; 
	this.regexp =new RegExp(this.separators.map(function(sep) { 
				                return "\\" + sep[0];})
		         );
}

CSVReader.prototype.read = function(str) { 
	var lines = str.trim().split(/\n/); 
	return lines.map(function(line) {
		return line.split(this.regexp);
		}, this); // forward outer this-binding to callback
};
var reader = new CSVReader(); 

console.log(reader.separators);// [',']
console.log(reader.regexp);// /\,/
console.log(reader.read("a,b,c,d,e,f\n")); // [['a','b','c','d','e','f']]

```

### toString
```javascript
console.log("J" + { toString: function() { return "S"; } }); //JS
```


### IIFE
```javascript
function foo() {
	console.log( this.a );
}

var a = 2;

(function(){
	"use strict";

	foo(); // undefined
	
})();

```

### first-class function
```javascript
function log(a) {
   a();    // hi
}

log(function() {
    console.log('hi');   
});
```
### apply
```javascript
function myFunc(myArg) {
  return this.myProp + " " + myArg;
}
 
var result = myFunc.apply(
  { myProp: "prop" },
  [ "arg" ]
);

console.log(result); // prop arg
```

### Symbol
```javascript
let uid = Symbol.for("uid");
let object = {
    [uid]: "12345"
};

let symbols = Object.getOwnPropertySymbols(object);

console.log(symbols.length);        // 1
console.log(symbols[0]);            // "Symbol(uid)"
console.log(object[symbols[0]]);  //12345
console.log(symbols); //[Symbols {}]
```

```javascript
function MyObject() {
    // ...
}

Object.defineProperty(MyObject, Symbol.hasInstance, {
    value: function(v) {
        return false;
    }
});

let obj = new MyObject();

console.log(obj instanceof MyObject); //false
console.log(obj[Symbol.hasInstance]); //undefined
```


### Set
```javascript
let set = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
console.log(set);  //Set {1,2,3,4,5}


function eliminateDuplicates(items) {
    return [...new Set(items)];
}

let numbers = [1, 2, 3, 3, 3, 4, 5],
    noDuplicates = eliminateDuplicates(numbers);

console.log(noDuplicates); //[1,2,3,4,5]
```


### Generator
```javascript
function *createCreator(){
	yield * "hello";
}

var iterator=createCreator();  
console.log(iterator.next()); // { value: 'h', done: false }
console.log(iterator.next()); // { value: 'e', done: false }
console.log(iterator.next()); // { value: 'l', done: false }
console.log(iterator.next()); // { value: 'l', done: false }
console.log(iterator.next()); // { value: 'o', done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```
