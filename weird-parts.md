## scoping
var -- function scope, cannot be accessed just outside the function
let -- block scope
### hoisting -- lexical scoping, things defined outside are available inside
```javascript
b();
console.log(a); //undefined

var a = 'Hello World!';
function b() {
    console.log('Called b!');
}
```

### scope chain / lexical


## this keyword


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

//IIFE
(function(lang1, lang2) {
    console.log('Logged: ' + this.getFullName());
    console.log('Arguments: ' + lang1 + ' ' + lang2);
    console.log('-----------');
    
}).apply(person, ['es', 'en']);

```
* function borrowing
```javascript
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


## conversion

```javascript
let x=2+'2';   // '22'
x=2+2+'2';   // '42'
x=2+true;   // 3
x=2+true+'2';   // '33'
x=2+Number('2');   // 4'
x=Number('hello');   // NaN
x=typeof(x); //number
Boolen(null, undefined, 0, '') ===> false
```
