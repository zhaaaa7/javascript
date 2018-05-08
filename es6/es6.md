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
