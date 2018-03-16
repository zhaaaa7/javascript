https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

List method:
* change the list: .pop() .shift() .push()
* Make a new copy: slice() map() filter()
* Return undefined: forEach()

## map() 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

The map() method creates a new array with the results of calling a provided function on every element in the calling array.
```javascript
var new_array = arr.map(function callback(currentValue[, index[, array]]) {// Return element for new_array}[, thisArg])
```
```javascript
var array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = array1.map(x => x * 2);

console.log(map1);
// expected output: Array [2, 8, 18, 32]
```

## find()  
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find

The find() method returns the value of the first element in the array that satisfies the provided testing function. Otherwise undefined is returned.

```javascript
arr.find(callback(currentValue[, index[, array]]){...........}[, thisArg])
```
```javascript
var array1 = [5, 12, 8, 130, 44];

var found = array1.find(function(element) {
  return element > 10;
});

console.log(found);
// expected output: 12
```

## findIndex()
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex

The findIndex() method returns the index of the first element in the array that satisfies the provided testing function. Otherwise -1 is returned.
```javascript
arr.find(callback(currentValue[, index[, array]]){...........}[, thisArg])
```
```javascript
var array1 = [5, 12, 8, 130, 44];

function findFirstLargeNumber(element) {
  return element > 13;
}

console.log(array1.findIndex(findFirstLargeNumber));
// expected output: 3
```
## filter()
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

```javascript
```
```javascript
```
5. reduce()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce?v=b
```javascript
```
```javascript
```



6. concat()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat?v=b
```javascript
```
```javascript
```
7. slice()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
```javascript
```
```javascript
```
8. splice()  => https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
```javascript
```
```javascript
```
