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
11. undefined arguments

```javascript
const workoutJournal = (miles, avgTime) => {
  console.log('I ran ' + miles + ' miles at an average of ' + avgTime + ' per mile.');
}
workoutJournal(‘3’); // I ran 3 miles at an average of undefined per mile.

```
there is no arguments in arrow function.

12. complex condition
```javascript
let runTime = 35;
let runDistance = 3.5;
if (runTime <= 30 && runDistance > 3.5) {
  console.log("You're super fast!");
} else if (runTime >= 30 && runDistance <=3) {
  console.log("You're not making your pace!");
} else if (runTime > 30 || runDistance > 3) {
  console.log('Nice workout!'); 
} else {
  console.log('Keep on running!');
}
//Nice workout!

```

13. DOM event
```
<div class="test1"></div>
<script>
    document.querySelector('.test1').addEventListener('click', function () {
        console.log(1)
    })
    document.querySelector('.test1').addEventListener('click', function () {
        console.log(2)
    }, true)
</script>
请问：点击div.test1后，数字1和2的出现顺序是什么样的？
```

1,2

因为 如果被监听的元素没有子元素，那么哪个监听代码写在前面，就先执行哪个！



```
<label>Click me <input type="text"></label>
<script>
    document.querySelector('label').addEventListener('click',function () {
        console.log(1)
    })
    document.querySelector('input').addEventListener('click',function () {
        console.log(2)
    })
</script>
```
请问：点击label后，数字1和2的出现顺序是什么样的？

答案： 1,2,1

因为label和input是有绑定的

点击label后，浏览器自动帮你再点击一次label 
过程就是先进行一次事件机制，这一次对内部input元素的事件监听是不管不问的，所以先打出 1
结束后，再进行一次事件机制，这一次，按照正常事件机制流程走，所以接着打出了 2,1

14. closure
```javascript
function fun(n,o){
  console.log(o);
  return {
    fun: function(m){
      return fun(m,n);
    }
  };
}

var a = fun(0);  // undefined
a.fun(1);        // 0        
a.fun(2);        // 0
a.fun(3);        // 0

var b = fun(0).fun(1).fun(2).fun(3);  // undefined 0 1 2

var c = fun(0).fun(1);  // undefined 0
c.fun(2);        // 1
c.fun(3);        // 1
```
