## object
* prototype (.__proto__)

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
console.log(john.firstname);  //John

```
searches along the prototype chain
```javascript
var jane = {
    firstname: 'Jane'   
}
jane.__proto__ = person;
console.log(jane.getFullName()); // Jane Default
//"this" refers to jane first because it calls the methods, then it searches along the prototype chain
```
add new methods on prototype
```javascript
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
