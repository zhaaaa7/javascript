1. || and && operator
https://imys.net/20150424/js-simple-condition.html

```
&&的返回值会返回最早遇到以下类型的值：
NaN null undefined 0 false;

||的返回值会返回最早遇到的非以下类型的值：
NaN null undefined 0 false;
```
```javascript
for( var i=0 ; i<10000 ; i++ ) {
    i == 9999 && resolve();
}

for( var i=0 ; i<10000 ; i++ ) {
    if(i == 9999){
              resolve();
        }
}
```
2. coersion
```javascript

console.log([]+[]); //empty string
```

3. template string as argument
```javascript
function a(){
  return "hello";
}
const s=a `hi`;  
console.log(s);// a('hi')

```
4. make the html editable
```javascript
<div contenteidatble="true">Hello</div>
document.body.contenteidatble=true;
```

5. 'this' of the function in an array is the array

```javascript
function y(){
  console.log(this);
} 

const l=[y,1,'hello'];

l[0](); // [ [Function: y], 1, 'hello' ]
```
arguments is array-like

```javascript
function y(){
  console.log(this);
} 

var x={
  length:5,
  method: function(fn){
  	console.log(this); //{ length: 5, method: [Function: method] }
  	console.log(arguments[0]); //[Function: y]
    arguments[0](); //{ '0': [Function: y], '1': 1 }
  }
};

x.method(y,1);
```
```javascript
function y(){
  console.log(this.length);
} 

var x={
  length:5,
  method: function(y){
    console.log(this.length); // 5
  	console.log(arguments[0]); //[Function: y]
    arguments[0](); // 2, this refers to the arguments
  }
};

x.method(y,1);
```

6. 'constructor' is a special property, it refers to the constructor of the object
```javascript
const ss='constructor';
console.log(ss[ss](01)); //1    the same as String(01)
```

7. number is float point number
```javascript
console.log(0.1+0.2); // 0.30000000000000004 
```

8. object's prototype is null
```javascript
console.log(('hi').__proto__.__proto__.__proto__); //null
```

9. function borrowing, arguments is array-like but doesn't have array methods
```javascript
const args=function(){
  return [].slice.call(arguments).length;
};

console.log(args(1,2,3)); // 3


//the same as
const args=function(){
  var call=[].slice.bind(arguments);
  return call().length;
};

console.log(args(1,2,3)); // 3
```

10. 'this' in object
```javascript
let tempObject = {
  num: 2,
  numSquared() {
    num = 3;
    return this.num * this.num;
  }
};

console.log(tempObject.numSquared()); //4
```
```javascript
let tempObject = {
  num: 2,
  numSquared() {
    num = 3;
    return num * num;
  }
};

console.log(tempObject.numSquared()); //9
```
