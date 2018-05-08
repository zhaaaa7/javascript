## map
1. why need a map -- we can't use object as object property name. it will be converted to string by calling Object.prototype.toString().
```javascript
const x={};
const a={};
const b={num:1};

x[a]='a';  // { '[object Object]': 'a' }
x[b]='b';

console.log(x); //{ '[object Object]': 'b' }
```
2. how map works
```javascript
const a={};
const b={num:1};
const map= new Map();
map.set(a,'a').set(b,'b');
console.log(map); //Map { {} => 'a', { num: 1 } => 'b' }
map.delete(b);
```

3. map has iterator -- so can use `let of` to iterate through it

```javascript
let myMap = new Map();
myMap.set(0, 'zero');
myMap.set(1, 'one');
for (let [key, value] of myMap) {
  console.log(key + ' = ' + value);
}
// 0 = zero
// 1 = one

for (let key of myMap.keys()) {
  console.log(key);
}
// 0
// 1

for (let value of myMap.values()) {
  console.log(value);
}
// zero
// one

for (let [key, value] of myMap.entries()) {
  console.log(key + ' = ' + value);
}
// 0 = zero
// 1 = one
```
4. is closely related to Array
```javascript
const arr=[...map];
console.log(arr); //[ [ {}, 'a' ], [ { num: 1 }, 'b' ] ]
```

```javascript
var kvArray = [['key1', 'value1'], ['key2', 'value2']];

// Use the regular Map constructor to transform a 2D key-value Array into a map
var myMap = new Map(kvArray);

myMap.get('key1'); // returns "value1"

// Use the Array.from function to transform a map into a 2D key-value Array
console.log(Array.from(myMap)); // [['key1', 'value1'], ['key2', 'value2']]

// Or use the keys or values iterators and convert them to an array
console.log(Array.from(myMap.keys())); ["key1", "key2"]
```
### weakmap -- to save memory

```javascript
{
  let x={a:[1,2]}; //x is a block varibale
  var map=new Map();
  map.set(x,'set x');
};

//but x still exists here, because map has a reference to x
console.log(map); // Map { { a: [ 1, 2 ] } => 'set x' }


{
  let x={a:[1,2]}; 
  var weakmap=new WeakMap();
  weakmap.set(x,'set x');
};

console.log(weakmap); //WeakMap {}, memory is cleared

```
