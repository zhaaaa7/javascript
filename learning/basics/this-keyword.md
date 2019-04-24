1. call in the form of object method -- object
```javascript
var myObj = {
 
  myProp: "outer-value",
  createInnerObj: function createInnerObj() {
  	console.log(this.myProp); //"outer-value"
 
    var hidden = "value-in-closure";
 
    return {
      myProp: "inner-value",
      innerFunc: function innerFunc() {
        return "hidden: '" + hidden + "', myProp: '" + this.myProp + "'";
      }
    };
 
  }
};
 
var myInnerObj = myObj.createInnerObj();
console.log( myInnerObj.innerFunc() ); // hidden: 'value-in-closure', myProp: 'inner-value'
```
2. call the function directly  -- window
```javascript
var myObjGlobal = {
 
  myProp: "outer-value",
  createInnerObj: function createInnerObj() {
  	console.log(this.myProp); //outer-value
 
    var hidden = "value-in-closure";
 
    var innerFunc=function innerFunc() {
        return "hidden: '" + hidden + "', myProp: '" + this.myProp + "'";
      }
     
    console.log('hello globl',innerFunc()); // hello globl hidden: 'value-in-closure', myProp: 'undefined'
 
  }
};

myObjGlobal.createInnerObj();
```

3. function's property -- function
```javascript
callTest.call2=function(){
	console.log('[inside call2]',this); // [inside call2] [function callTest()]
}

callTest.call2();

```

4. call methods -- the first argument in call method
```javascript
function callTest(){
	console.log('[inside callTest]', this); // [inside callTest] { callTestObj: 'test' } 
}

const callTestObj={'callTestObj':'test'};
callTest.call(callTestObj);
```

```javascript
function stat(){
	console.log('inside stat', this)
}
stat.a=function(){console.log('inside static a', this)};

stat.a(); // this => stat
stat();  // this => global
```

5. IIFE
```js

var myObject = {
    foo: "bar",
    func: function () {
        var self = this;
        console.log("outer func:  this.foo = " + this.foo); //bar
        console.log("outer func:  self.foo = " + self.foo);  //bar
        (function () {
            console.log("inner func:  this = " + this); //[object Window]
            console.log("inner func:  self = " + self); //[object Object]
        }());
    }
};
myObject.func();
```

## case -- directly call V.S. call object method
1.
```js
var length = 10;
function fn() {
  console.log(this);  // global, Arguments
}
var obj = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[0]();
  }
}
obj.method(fn);

var length = 10;
const fn = () => {
    console.log(this.length); //global, global
}
var obj = {
    length: 5,
    method: function (fn) {
        fn();
        arguments[0]();
    }
}
obj.method(fn);

```

2. 
```js
function arr1() {
    console.log(this.length); //4. this->arrTest
}

const arrTest = [arr1, 2,2,2];
arrTest[0]();
```
