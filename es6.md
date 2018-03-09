## map
why need a map
```javascript
const x={};
const a={};
const b={num:1};

x[a]='a';
x[b]='b';

console.log(x); //{ '[object Object]': 'b' }
```
how map works
```javascript
const a={};
const b={num:1};
const map= new Map();
map.set(a,'a').set(b,'b');
console.log(map); //Map { {} => 'a', { num: 1 } => 'b' }
map.delete(b);
```
map has iterator

```javascript
for (let [key,value] of map.entries()){
  console.log(key,value);
  //{} 'a'
  //{ num: 1 } 'b'
}

const arr=[...map];
console.log(arr); //[ [ {}, 'a' ], [ { num: 1 }, 'b' ] ]

```
weakmap

```javascript
{
  let x={a:[1,2]}; //block varibale
  var map=new Map();
  map.set(x,'set x');
};

console.log(map); //but still exists here, Map { { a: [ 1, 2 ] } => 'set x' }


{
  let x={a:[1,2]}; 
  var weakmap=new WeakMap();
  weakmap.set(x,'set x');
};

console.log(weakmap); //WeakMap {}, memory is cleared

```
## default value
```javascript
x={
  a:1,
  b:2
};

//const add=(x={a:0,b:0})=>{
//  return x.a+x.b;
//};

//destructuring
const add=({a=0,b=0}={})=>{
  return a+b;
};
console.log(add()); //0
console.log(add(x)); //3

```

## arrow function
```javascript
const x=function(a,b,c){
  console.log(arguments);
}
x(1,2,3); //{ '0': 1, '1': 2, '2': 3 }

```
```javascript
const x=(...n)=>{
  console.log(n);
}
x(1,2,3); //[ 1, 2, 3 ]

```
bind 'this' to parent's 'this'
```javascript
const x=function(){
  this.val=1;
  this.set=setTimeout(()=>{
    this.val++;
    console.log(this.val);
  },1);
};

const t=new x();

```
## spread operator and rest operator
spread --allows an iterable such as an array expression or string to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected, or an object expression to be expanded in places where zero or more key-value pairs (for object literals) are expected.
```javascript
const args=[1,2];
const x=function(a,b,c){
  console.log(b);
};
x(1,...args) // 1

```
rest
```javascript
const x=function(a,b,...n){
  console.log(n);
};
x(1,2,3,4,5) // [ 3, 4, 5 ]

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

