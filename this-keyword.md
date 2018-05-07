1. call in the form of object method
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
2. call the function directly
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
