## class

Why class:
To share data and methods between objects.

The subclass inherits all of the parent's getters, setters, and methods. You can also use the super keyword to set properties in the parent class. Each instance of a class has the same properties, getters, setters, and methods. Only the property values change.

* super keyword

The super keyword is used in subclasses to call a parent constructor(). super accepts arguments for the parent constructor()'s parameters. If you use this before super, JavaScript will throw an error.

Static method*

They are made directly on the class and are not callable on instances of the class. 




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

spread
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
usage
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
relation to apply()
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
* backtick(``)
```javascript
//preserve spaces
const str=`hello

            wulu`;

console.log(str);

```
```javascript
let x1=1;
let x2=2
let str=`There are  ${x1+x2} apples`;
console.log(str); //There are  3 apples

```
nature of backticks(``)
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
* new methods
```javascript
//not escaping
const raw=String.raw`Not a newline:\n`;
console.log(raw);  //Not a newline:\n

```

## iterator
Symbol.iterator --  is the property that indicate whether this data structure is iterable
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

'of' in for loop
```javascript
const mySet=new Set([1,2,3,4,4]);
console.log(mySet); //Set { 1, 2, 3, 4 }
for(let val of mySet){
  console.log(val); //1 2 3 4
}

//object is not iterable
const myObj={
  a:'a',
  b:'b'
};
//cannot use of 
//all in the prototype chain?
for (let key in myObj){
  console.log(key); //a b
}
```

## generator
a function that helps to generate the value an iterator to be used
```
* symbol and yield expression -- stops the producing of value
```
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

pausing -- no stack overflow
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
return terminate the iterator
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
```

usage -- aync

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
## promise
```javascript
const promise1=new Promise(function(resolve,reject){
  //cleaning the room

  const isClean=false;

  if(isClean){
    resolve('cleaned');
  }else{
    reject('not cleaned');
  }
});

promise1.then(function(formResolve){
  console.log(formResolve);
}).catch(function(fromReject){
  console.log(fromReject);
}); 
```
dependency
```javascript
const promise1=function(){
  return new Promise(function(resolve,reject){
    resolve('promise1');
  });
};

const promise2=function(p){
  return new Promise(function(resolve,reject){
    resolve(p+' promise2');
  });
};

const promise3=function(p){
  return new Promise(function(resolve,reject){
    resolve(p+' promise3');
  });
};

promise1().then(function(result){
  return promise2(result);
}).then(function(result){
  return promise3(result);
}).then(function(result){
  console.log('done',result); //done promise1 promise2 promise3
});
```

```javascript
Promise.all([promise1,promise2,promise3]).then(function(){
  console.log('all done');
});


Promise.race([promise1,promise2,promise3]).then(function(){
  console.log('one done');
});
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
