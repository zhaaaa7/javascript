## map
1. why need a map -- we can't use object as object property name. it will be converted to string by calling Object.prototype.toString().
```javascript
const x={};
const a={};
const b={num:1};

x[a]='a';  // { '[object Object]': 'a' }
x[b]='b';

console.log(x); //{ '[object Object]': 'b' }
```
2. how map works
```javascript
const a={};
const b={num:1};
const map= new Map();
map.set(a,'a').set(b,'b');
console.log(map); //Map { {} => 'a', { num: 1 } => 'b' }
map.delete(b);
```

3. map has iterator -- so can use `let of` to iterate through it

```javascript
let myMap = new Map();
myMap.set(0, 'zero');
myMap.set(1, 'one');
for (let [key, value] of myMap) {
  console.log(key + ' = ' + value);
}
// 0 = zero
// 1 = one

for (let key of myMap.keys()) {
  console.log(key);
}
// 0
// 1

for (let value of myMap.values()) {
  console.log(value);
}
// zero
// one

for (let [key, value] of myMap.entries()) {
  console.log(key + ' = ' + value);
}
// 0 = zero
// 1 = one
```
4. is closely related to Array
```javascript
const arr=[...map];
console.log(arr); //[ [ {}, 'a' ], [ { num: 1 }, 'b' ] ]
```

```javascript
var kvArray = [['key1', 'value1'], ['key2', 'value2']];

// Use the regular Map constructor to transform a 2D key-value Array into a map
var myMap = new Map(kvArray);

myMap.get('key1'); // returns "value1"

// Use the Array.from function to transform a map into a 2D key-value Array
console.log(Array.from(myMap)); // [['key1', 'value1'], ['key2', 'value2']]

// Or use the keys or values iterators and convert them to an array
console.log(Array.from(myMap.keys())); ["key1", "key2"]
```
### weakmap -- to save memory

```javascript
{
  let x={a:[1,2]}; //x is a block varibale
  var map=new Map();
  map.set(x,'set x');
};

//but x still exists here, because map has a reference to x
console.log(map); // Map { { a: [ 1, 2 ] } => 'set x' }


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

1. rest -- used when defining parameters when declaring a function

```javascript
const x=function(a,b,...n){
  console.log(n);
};
x(1,2,3,4,5) // [ 3, 4, 5 ]
```

2. spread -- used when passing in arguments when calling a function

```javascript
const args=[1,2];
const x=function(a,b,c){
  console.log(b);
};
x(1,...args) // 1

```

3. usage
3-1. spread allows an iterable such as an **array expression** or **string** to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected, or an object expression to be expanded in places where zero or more key-value pairs (for object literals) are expected.
```javascript
 //copy
const x=[1,2,3,4];
const y=Object.assign([],x);
const z=[...x];

//merge
const a=[1,2,3];
const b=[4,5,6];
console.log([...a,...b]); //[ 1, 2, 3, 4, 5, 6 ]
console.log(a.concat(...b)); //[ 1, 2, 3, 4, 5, 6 ]

```
3-2. to replace apply()
```javascript
let x=[1,2,3];
const func=function(...arg){
  console.log(arg);
};
func(...x);
//the same as
func.apply(null,x);

```


## template string 
1.  backtick(``)
```javascript
//preserve spaces
const str=`hello

            wulu`;

console.log(str);

```
2. add varaible
```javascript
let x1=1;
let x2=2
let str=`There are  ${x1+x2} apples`;
console.log(str); //There are  3 apples

```
3. the nature of backticks(``) -- split the string into a string array and a variable array
```javascript
let x1=1;
let x2=2
let str=`There are  ${x1+x2} apples`;
const tagged=function(strArray,...vals){
  console.log(strArray);
  console.log(vals);
};
tagged `There are ${x1} +${x2} ${x1+x2} apples`;
//[ 'There are ', ' +', ' ', ' apples' ]
//[ 1, 2, 3 ]
```

4. a new string method
```javascript
//not escaping
const raw=String.raw`Not a newline:\n`;
console.log(raw);  // Not a newline:\n
```

## iterator
1. Symbol.iterator --  is the property that indicate whether this data structure is iterable
```
const myArray=[1,2,3,4,5];

//extract the iterator function of array
let iterator=myArray[Symbol.iterator]();
console.log(iterator.next()); //{ value: 1, done: false }
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next()); //{ value: 5, done: false }
console.log(iterator.next()); //{ value: undefined, done: true }
```

2. can use 'of' in for loop
```javascript
const mySet=new Set([1,2,3,4,4]);
console.log(mySet); //Set { 1, 2, 3, 4 }
for(let val of mySet){
  console.log(val); //1 2 3 4
}
```
to contrast: object is not iterable
```javascript

const myObj={
  a:'a',
  b:'b'
};
//cannot use `of`, can just use `in` along the prototype chain?
for (let key in myObj){
  console.log(key); //a b
}
```

## generator
1. a function that helps to generate the value an iterator to be used
```
* symbol and yield expression together -- stops the producing of value
```
2. 
```javascript
function *generator(){
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
}

const iterator=generator();
console.log(iterator.next()); //{ value: 1, done: false }
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next()); //{ value: 5, done: false }
console.log(iterator.next()); //{ value: undefined, done: true }
```

3. pausing ensures no stack overflow
```javascript
function *infiniteMaker(){
    let i=0;
    while(true){
      yield i;
      i++;
    }
}

const iterator=infiniteMaker();
console.log(iterator.next()); //{ value: 1, done: false }
console.log(iterator.next());
console.log(iterator.next());
```
4. `return` terminates the iterator
```javascript
function *generator(){
   yield 1;
   yield *anotherGenerator();
   return 'stop';
   yield 3;
}

function *anotherGenerator(){
  yield 2;
}

const iterator=generator();
console.log(iterator.next()); 
console.log(iterator.next()); //{ value: 2, done: false }
console.log(iterator.next()); //{ value: 'stop', done: true }
console.log(iterator.next()); //{ value: undefined, done: true }
```

5. usage -- do aynchronous request

```javascript
function(url){
  return new Promise(function(resolve,reject){
    makeAjaxCall(url,function(err,value){
      if(err){
          reject(err);
      }else{
        resolve(value);
      }
    })
  });
}
function *generator(){
  yield request('url1');
  yield request('url2');
}

//if completion of url1 request is required fro url2 request
//..iterator
```



## request
1. onreadystatechange is an event handler property 
2. JSON.stringify() converts JSON objects to strings that can be read by APIs.
3. GET requests only request data from other websites whereas POST requests submit data to other sites.
4. await keyword causes an async function to pause execution until the desired Promise is resolved.


## Some tips

https://www.udemy.com/react-the-complete-guide-incl-redux/learn/v4/t/lecture/8199180?start=0

1. default export can be imported with any name, named export needs destructing
2. When you use arrow function, you will have no problem with “this”
3. spread and rest “operator”. Spread is to split array or object. Rest is to merge function arguments into an array.
4. filter() returns an array
5. destructing is different from spread which allows you to exact one elements and assign it to as variable, while spread takes out all elements and distribute them in new arrays or objects.
6. spread is used to create a “real copy” of an object, not the reference
7. array function: takes a function as an input which is executed on each element.
