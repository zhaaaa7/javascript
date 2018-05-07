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
