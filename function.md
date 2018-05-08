## arguments object
```javascript
function log(){
    console.log(arguments); //{ [Iterator]  '0': 1, '1': 2 }
}

log(1,2);
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
