## null
```javascript
console.log(typeof(null)); //object
```

## primitive and primitive contructor
```js
var strPrimitive = "I am a string";
console.log(typeof strPrimitive);							// "string"
console.log(strPrimitive instanceof String);					// false

var strObject = new String( "I am a string" );
console.log(typeof strObject); 								// "object"
console.log(strObject instanceof String);					// true

// inspect the object sub-type
console.log(Object.prototype.toString.call( strObject ));	// [object String]


const num = 1;
console.log(num instanceof Number); //false


function foo() {
        return 'foo';
    }

console.log(foo.toString()) 
//function foo() {
//        return 'foo';
//    }

console.log(Array.prototype.toString.call(foo)); //[object Function]
```

## cohersion
```js
console.log(1 + "2" + "2");  //122
console.log(1 + +"2" + "2"); //32
console.log(1 + -"1" + "2");   //02
console.log(+"1" + "1" + "2"); //112
console.log("A" - "B" + "2"); //NaN2
console.log("A" - "B" + 2);   //NaN
```
