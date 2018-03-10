## function

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
* function factories
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

var greetEnglish = makeGreeting('en'); 
// greetEnglish is a function whose closure points to language == english which is kept in the first excution context
var greetSpanish = makeGreeting('es');

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
## functional programming

```javascript
function mapForEach(arr, fn) {
    
    var newArr = [];
    for (var i=0; i < arr.length; i++) {
        newArr.push(
            fn(arr[i])   //change the element using the passed function
        )
    };
     
    return newArr; // return something new, not chaning the original array
}

var arr1 = [1,2,3];
console.log(arr1);


var arr2 = mapForEach(arr1, function(item) {
   return item * 2; 
});
console.log(arr2);


/*var arr3 = mapForEach(arr1, function(item) {
   return item > 2; 
});
console.log(arr3);
*/

var checkPastLimit = function(limiter, item) {
    return item > limiter;   
}


var arr4 = mapForEach(arr1, checkPastLimit.bind(this, 1)); //set limiter==1
console.log(arr4);


var checkPastLimitSimplified = function(limiter) {
    return function(limiter, item) {
        return item > limiter;   
    }.bind(this, limiter);                         
    //create a function with limiter preset
};

var arr5 = mapForEach(arr1, checkPastLimitSimplified(1));
console.log(arr5);
```
