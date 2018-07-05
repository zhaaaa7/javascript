1. Persons's prototype property is the prototype of the instance, such as John
2. Each object is the instance of the Object constructor
3. Prototype chain: when we try to access a method

1. Object.create() allow us to specify which object to be the prototype

1. primitive type hold the value, object hold the refence to the memory



currying: create a function based on another function with some preset arguments -- usually with bind() method


js code -> js parser -> Abstract Syntax Tree -> machine code

global execution context: 
1) code not inside any function
2) is assocaited with globale object (window)



execution context object 
1) Variable Object (VO)
* argument object is created
* function declarations -- real function code
* variable declarations -- value is undefined

2) scope chain
* scope 
    - where can we access a certain variable
    - function scope -- lexical scope

3) `this` variable
