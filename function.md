## arguments object
```javascript
function log(){
    console.log(arguments); //{ [Iterator]  '0': 1, '1': 2 }
}

log(1,2);
```


## closure
* lexical environment: everything outside can be accessed by everything inside

```javascript
passed=1
const addTo=function(){
  const inner=2;
  return passed+inner;
}
console.log(addTo()); //3
```


```javascript
const addTo=function(passed){
  const inner=function(inner){
    return passed+inner;
  };
  return inner;
}

addThree=addTo(3)
console.log(addThree); //[ Function: inner]
console.log(addThree(1)); //4
```

## callback / higher order functions
1. functions are firsclass objects, pass functions as arguments into functions

```javascript
const add=function(a,b){
  return a+b;
};

const calculate=function(n1,n2,calType){
  return calType(n1,n2);
};

console.log(calculate(1,2,add)); //3
```
2. functional programming -- sort an array
```javascript
// sort by num
const list=[
{num:1,name:'c'},
{num:2,name:'b'},
{num:3,name:'a'}];

list.sort(function(item1,item2){
  if(item1.num<item2.num){
    return -1;
  }else{
    return 1;
  }
});
console.log(list);
// [ { num: 1, name: 'c' },
//   { num: 2, name: 'b' },
//   { num: 3, name: 'a' } ]


//sort by name
list.sort(function(item1,item2){
  if(item1.name<item2.name){
    return -1;
  }else{
    return 1;
  }
});
console.log(list);
// [ { num: 3, name: 'a' },
//   { num: 2, name: 'b' },
//   { num: 1, name: 'c' } ]

```
## bind, call, apply are methods of Function.prototype object
1. sepcify the `this`
```javascript
const obj={num:2};

const addToThis=function(a,b){
  return this.num+a+b;
}

//call
console.log(addToThis.call(obj,3,2)); //7

//apply
const list=[3,2]
console.log(addToThis.apply(obj,list)); //7

//bind
console.log(addToThis.bind(obj)); // [Function: bound addToThis]
console.log(addToThis.bind(obj)(3,2)) //7

```
2. usage
2-1. borrow function from native object 
```javascript
const argsToArray=function(){
  return [].slice.call(arguments);
};

console.log(argsToArray(1,2,3)); //[1,2,3]

//the same as
console.log([1,2,3].slice());

```
2-2. inheritance

```javascript
const Mammal=function(legs){
  this.legs=legs;
};

Mammal.prototype={
  walk(){
    return 'walking';
  },

  sleep(){
    return 'sleeping'
  }
};

const Bat=function(legs,isVegetarian){
  Mammal.call(this,legs);
  this.isVegetarian=isVegetarian;
}


const bat=new Bat(4,true);  //  Bat { legs: 4, isVegetarian: true } 

```
2-3. apply methods that take array as arguments
```javascript
const list=[1,2,3];
console.log(Math.min.apply(null,list));
```

2-4. bind method back to the object
```javascript
const Button=function(content){
  this.content=content;
};

Button.prototype.click=function(){
  console.log(`${this.content} is clicked`);
};

const newButton= new Button('add');
newButton.click(); //add is clicked

const looseClick= newButton.click;
looseClick(); //undefined is clicked

const boundClick= newButton.click.bind(newButton);
boundClick(); //add is clicked
```
2-5. make `this` inside function inside object methods point to the object
```javascript
const obj={
  asyncGet(cb){
    cb();
  },
  parse(){
    console.log('calling parse');
  },
  render(){
    this.asyncGet(function(){
      this.parse(); // if no binding, 'this' refers to the window
    }.bind(this)); //bind the 'obj' to 'this' inside the function
  }
};

obj.render(); //calling parse
```

## IIFE
1. module
```javascript
const counter=(function(){
  let i=0;
  return {
    get: function(){return i},
    set: function(value){i=value},
    increment:function(){i++}
  };

})();

console.log(counter.get()); //0
counter.set(5);
console.log(counter.get()); //5
counter.increment();
console.log(counter.get()); //6
```

2. jQuery
```javascript

//private methods
(function($){
  $(this).addClass('red');
})(window.jQuery);

```


## currying -- use closure
1. set partical argument
```javascript
const add=function(a){
  return function(b){
    return a+b;
  }
};

const addToFive=add(5);
console.log(addToFive(1)); //6
```
2. 
```javascript
const avg=function(...args){
  let total=0;
  for (let i=0; i<args.length;i++){
    total+=args[i];
  }
  return total/args.length;
}

const spiceIp=function(fn,...args){
  return function(...nargs){
    return fn.apply(this,args.concat(nargs));
  };
};

const doAvg=spiceIp(avg,1,2,3);
console.log(doAvg(4,5,6)); //3.5

```
3.
```javascript
const sayWhat=function(a){
  return function(b){
    return function(c){
      console.log("saying "+a+" to "+b+' with '+c);
    };
  };
};

sayWhat('hello')('Amy')('phone');

```
## function chaining
1. return the instance itself in each method
```javascript
const obj=function () {
  this.i=0;
  this.add=function (i) {
    this.i+=i;
    return this;
  };
  this.subtract=function (i) {
    this.i-=i;
    return this;
  };
  this.log=function(){
    console.log(this.i);
  }
}

const x= new obj();
x.add(2).subtract(1).log(); //1

```
2. can also set the counter with closure
```javascript
const obj=function () {
  i=0;
  const add=function (j) {
    i+=j;
    return this;
  };
  const subtract=function (j) {
    i-=j;
    return this;
  };
  const log=function(){
    console.log(i);
  }
  return {add:add,subtract:subtract,log:log};
}

const x= obj();
x.add(2).subtract(1).log(); //1

```


## closure
1. The inner function is bind to the variable object of the outer funtion in the scope chain, not the specific value of the variable in variable object. The will only be 1 value of the variable.
(函数所绑定的是作用域本身，而不是该作用域中的变量或变量当前所返回的值。变量最后只会保存一个值.)
```javascrip
function f(arg){
  var n = function(){
    return arg;
  };
  arg++;
  return n;
  }
var m = f(123);
m();//调用函数，输出124
```
有一点很重要：n被赋值时函数并没有被调用，调用发生是在n被求值，也就是执行return n;语句时。

2. closure in the loop
(这种闭包所导致的bug往往很难被发现，因为它们表面上看起来很正常，来看一下下面的函数)
```javascript
function f(){
  var a = [];
  var i;
  for (i = 0; i < 3; i++){
    a[i] = function(){
      return i;
    }
  }
  return a;
  }


var a = f();
a[0]();// 3
a[1]();// 3
a[2]();// 3
```
为啥不是0、1、2呢？为啥会这样呢？原来在这里创建的三个闭包，它们都指向了一个共同的局部变量i，但是，闭包不会记录它们的值，它们所拥有的的只是一个i的连接（即引用），因此只能返回i当前值，因为i结束循环时值为3，所以这三个函数都指向一个共同值3

How to fix that?
* IIFE
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
```
这里使用了自调函数，不再直接返回i的值，而是将i传递给自调函数，i赋值给了局部变量x，这样一来，每次迭代x就会拥有各自不同的值了。

* create another function which localize the value of each i because js function argument is passed by value.
```javscript
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
a[0]();// 0
a[1]();// 1
a[2]();// 2
```
方案二不使用自调函数，而是定义了一个内部函数实现相同的功能，每次迭代操作中，将i的值“本地化”。
