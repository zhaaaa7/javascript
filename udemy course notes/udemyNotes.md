1. Persons's prototype property is the prototype of the instance, such as John
2. Each object is the instance of the Object constructor
3. Prototype chain: when we try to access a method

1. Object.create() allow us to specify which object to be the prototype

1. primitive type hold the value, object hold the refence to the memory



currying: create a function based on another function with some preset arguments -- usually with bind() method


js code -> js parser -> Abstract Syntax Tree -> machine code

global execution context: 
1) code not inside any function
2) is assocaited with globale object (window)



execution context object 

creation phase:

1) Variable Object (VO)
* argument object is created
* function declarations -- real function code
* variable declarations -- value is undefined

2) scope chain
* scope 

    - where can we access a certain variable
    
    - function scope -- lexical scope

* scope chain -- [VO2,VO1,Global VO]

```javascript
var a=1;
function first() {
    var b=1;
    second()
}

function second() {
    console.log(b); //error
}
```

3) `this` variable
* regular function call -- window
* method call -- object

    - method borrowing
    
    
    
## ES6
1. variable declaration
* let and const are block scoped, no hoisting
* var is function scoped, hoisting


2. data privacy
* block
* IIFE


3. string
* template literal: `${}`, startsWith(), endsWith(), includes(), repeat()
* `+`



4. arrow function
* lexical `this`


5. destrcturing
* `const {firstName:a, lastName:b}=obj;`
* `const [a,b]=[1,2];`


6. array
* `Array.from(nodeList)` <- `Array.prototype.slice().call(nodeLIst)`
* `for (let cur of boxes) {cur...}` <- `for (var i=0;i<boxes.length;i++){boxes[i]...}`
* findIndex(), find()

7. spread operator --takes an array/object and transform it into single values
* `addFourAges(...ageList)`<-`addFourAges.apply(null,ageList)`
* `[...array1,...array2]`
* `[h,...nodeList]`

8. rest operator -- receive multiple values and make them into an array
* allow us to pass arbitrary number of arguments into a function 
* `function isFullAge(...years){years}` <- `arr=Array.prototype.slice.call(arguments)`

9. default parameters
* `function(name='Smith'){}`<-`name=name||'Smith'`

10. Map -- a new key/value data structure
* hashmap: map string keys to arbitrary pey
* key can be any type
```javascript
consr question=new Map();
question.set('question','what is your name?');
question.set(1,'ES5');
question.set(2,'ES6');
question.set(3,'ES7');
question.set('correct',3);
question.set(true,'Correct!');
question.set(false,'Wrong!');

question.get('question');
question.size;

question.delete(3);
question.has(3);
question.clear();

```
* iterable
```javascript
question.forEach((value,key)=>{})


for (let key of question){}

for (let [key,value] of question.entries()){}
```
11. class

```javascript
var Person5=function(name,age){
    this.name=name;
    this.age=age;
    
}

Person5.prototype.calAge=function(){};
Person5.greeting=function(){}

```


```javascript
class Person6 {
    constructor(name.age) {
        this.name=name;
        this.age=age;
    }
    
    calAge(){}
    
    static greeting() {}
}
```

* non hoisting

12. inheritance

```javascript
function Student5(name,age,job){
    Person5.call(this,name,age);
    this.job=job;
}

Student5.prototype=Object.create(Person5.prototype);
```

```javascript
clss Student6 extends Person6 {
    constructor(name,age,job){
        super(name,age);
        this.job=job
    }
}
```

## asynchronous javascript -- non-blocking
1. Allows async functions to run in the 'background', which runs the callbacks once it finishes its work.
2. event loop: push the callbacks in Message Queue to execution context
3. web api -- live outside js engine: DOM methods, setTimeout(), http request, geolocation, localStorage
4. used to be done with callbacks -- callback hell
5. Promise -- the future value we are expecting
1) is an Object that tracks whether a certain event has happened

2) determines what happens next

3) status: pending, resolved (fulfilled / rejected)

4) 
* produce a Promise: send a result/value with that Promise
```javascript
const getIDs= new Promise((resolve,reject)=>{
    setTimeout(()=>{resolve([1,2,3,4])},1500);
});

const getRecipe=recID=>{
    return new Promise(()=>{
        setTimeout(()=>{resolve(`${ID}: recipe is`)},1500);
    });
};

```


* consume a Promise: use callbacks to use the value
```javascript
getIDs.then((ids)=>{
    console.log(ids); //[1,2,3,4]
    getRecipe(ids[2]);
})
.then((recipe)=>{
    console.log(recipe);
})
.catch((err)=>{
    console.log(err);
});
```
6. async/await -- simpler way to consume promise
1) wait: wait for the Promise to resolve to a value
```javascript
async function getRecipes(){
    const ids=await getIDs();
    const rec= await getRecipe(ids[2]);   
    
    return 'done';
}

getRecipes();
```
2) async functions runs on the 'background', it returns a Promise which resolves to the return value
```javascript

getRecipes().then(res=>{
    console.log(res); //done
});
```

7. ajax: asynchronous javascript and xml

   api: application programming interface
   
8. make ajax call with fetch -- web api, returns a promise
```javascript
fetch(url).then(res=>{
    console.log(res); //ReadableStream
    return result.json(); // a promise
})
.then(data=>{
    console.log(data); //real data
})
.catch(err=>{
console.log(err)});
```

9. make ajax call with async/await
```javascript
async function getWeather(){
    try{
        const res= await fetch(url);
        const data=await res.json();
        return data;
    }catch(err){
        console.log(err)});
    }

}

getWeather().then(res=>{})


```
