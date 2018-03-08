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
console.log(addThree); //[Function: inner]

console.log(addThree(1)); //4

```
## callback / higher order functions
functions are firsclass objects, pass functions as arguments into functions
```javascript
const x=function(){
  console.log('call back');
};

const y=function(callback){
  console.log('calling callback');
  callback();
}

y(x); //calling callback call back

```
usage

```javascript
const add=function(a,b){
  return a+b;
};

const calculate=function(n1,n2,calType){
  return calType(n1,n2);
};

console.log(calculate(1,2,add)); //3


//sort an array
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
## bind, call, apply

```javascript
const obj={num:2};

const addToThis=function(a,b){
  return this.num+a+b;
}

console.log(addToThis.call(obj,3,2)); //7

const list=[3,2]
console.log(addToThis.apply(obj,list)); //7

console.log(addToThis.bind(obj)); // [Function: bound addToThis]
console.log(addToThis.bind(obj)(3,2)) //7

```
usage
* borrow function from built-in 
```javascript
const argsToArray=function(){
  return [].slice.call(arguments);
};

console.log(argsToArray(1,2,3)); //[1,2,3]
//the same as
console.log([1,2,3].slice());

```
* inheritance

```javascript
let Mammal=function(legs){
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

let Bat=function(legs,isVegetarian){
  Mammal.call(this,legs);
  this.isVegetarian=isVegetarian;
}

```
* methods that take array as arguments
```javascript
const list=[1,2,3];
console.log(Math.min.apply(null,list));
```
* bind method back
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
* function inside object methods
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

```javascript
(function(i){
  return i+1;
})(j);

!function(){}();

//private methods
(function($){
  $(this).addClass('red');
})(window.jQuery);

```
a simple library
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
## currying -- use closure
```javascript
const add=function(a){
  return function(b){
    return a+b;
  }
};

const addToFive=add(5);
console.log(addToFive(1)); //6
```

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
with closure
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





