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

```javascript

console.log([]+[]); //empty string
```
```javascript
function a(){
  return "hello";
}
const s=a `hi`;  
console.log(s);// a('hi')

```
```javascript
<div contenteidatble="true">Hello</div>
document.body.contenteidatble=true;
```

```javascript
function y(){
  console.log(this.length);
} 

var x={
  length:5,
  method: function(y){
    arguments[0](); // 2, this refers to the arguments
  }
};

x.method(y,1);
```
```javascript
const ss='constructor';
console.log(ss[ss](01)); //1 String(01)
```

```javascript
console.log(0.1+0.2); // 0.30000000000000004 
```
```javascript
console.log(('hi').__proto__.__proto__.__proto__); //null
```
```javascript
const args=function(){
  return [].slice.call(arguments).length;
};

console.log(args(1,2,3)); // 3

```
