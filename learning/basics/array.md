https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

List method:

# create an array
```javascript
console.log(new Array(50)); [empty,.......empty]
```

# Mutate the array
## splice()
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice

The splice() method changes the contents of an array by removing existing elements and/or adding new elements.

```javascript
(originalArray===) array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
```
```javascript
var months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// inserts at 1st index position
console.log(months);
// expected output: Array ['Jan', 'Feb', 'March', 'April', 'June']

months.splice(4, 1, 'May');
// replaces 1 element at 4th index
console.log(months);
// expected output: Array ['Jan', 'Feb', 'March', 'April', 'May']
```
## pop() 
## shift() 
## push()

push() return the new array's length
```javascript
const b=[1,2];
console.log(b.push(2)); //3
```

## reverse()
The reverse method transposes the elements of the calling array object in place, mutating the array, and returning a reference to the array.
```javascript
var array1 = ['one', 'two', 'three'];
var reversed = array1.reverse(); 

console.log(array1);
// expected output: Array ['three', 'two', 'one']

console.log(reversed);
// expected output: Array ['three', 'two', 'one']
```

## sort
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

The sort() method sorts the elements of an array in place and returns the array. The sort is not necessarily stable. The default sort order is according to string Unicode code points.

```javascript
arr.sort([compareFunction])
```
If compareFunction is not supplied, elements are sorted by converting them to strings and comparing strings in Unicode code point order.
```javascript
var numbers = [4, 2, 5, 1, 3];
numbers.sort(function(a, b) {
  return a - b;
});
console.log(numbers);

// [1, 2, 3, 4, 5]
```

rules: 
* If compareFunction(a, b) is less than 0, sort a to an index lower than b, i.e. a comes first.
* If compareFunction(a, b) is greater than 0, sort b to an index lower than a, i.e. b comes first.



# Make a new copy
## map() 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

The map() method creates a new array with the results of calling a provided function on every element in the calling array.
```javascript
const new_array = arr.map(function callback(currentValue[, index[, array]]) {........}[, thisArg])
```
```javascript
var array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = array1.map(x => x * 2);

console.log(map1);
// expected output: Array [2, 8, 18, 32]
```

## filter()
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

The filter() method creates a new array with all elements that pass the test implemented by the provided function.

```javascript
const newArray=arr.filter(callback(currentValue[, index[, array]]){...........}[, thisArg])
```
```javascript
const words = ["spray", "limit", "elite", "exuberant", "destruction", "present", "happy"];

let longWords = words.filter(word => word.length > 6);
```

## reduce() 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce?v=b
The reduce() method applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.
```javascript
const new=arr.reduce(callback(accumulator,currentValue[, index[, array]]){...........}[, initialValue])
```
```javascript
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15
```

flat an array
```javascript
var flattened = [[0, 1], [2, 3], [4, 5]].reduce(
  function(accumulator, currentValue) {
    return accumulator.concat(currentValue);
  },
  []
);
// flattened is [0, 1, 2, 3, 4, 5]
```

counting the occurence of array items
```javascript
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

var countedNames = names.reduce(function (allNames, name) { 
  if (name in allNames) {
    allNames[name]++;
  }
  else {
    allNames[name] = 1;
  }
  return allNames;
}, {});
// countedNames is:
// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }
```

## concat()
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat?v=b

The concat() method is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.
The concat method does not alter this or any of the arrays provided as arguments but instead returns a **shallow copy** that contains copies of the same elements combined from the original arrays. concat **copies object references** into the new array. Both the original and new array refer to the same object. 

```javascript
var new_array = old_array.concat(value1[, value2[, ...[, valueN]]])
```
```javascript
var array1 = ['a', 'b', 'c'];
var array2 = ['d', 'e', 'f'];

console.log(array1.concat(array2));
// expected output: Array ["a", "b", "c", "d", "e", "f"]
```

## slice() 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice

The slice() method returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included).

```javascript
const newArray=arr.slice([begin[, end]])
```
```javascript
var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2,-1));
// expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
// expected output: Array ["bison", "camel", "duck", "elephant"]
```

### rules:
* Zero-based index 
* A negative index can be used, indicating an offset from the end of the sequence.
* If begin is undefined, slice begins from index 0. If end is omitted, slice extracts through the end of the sequence (arr.length).
* If begin is greater than the length of the sequence, an empty array is returned. If end is greater than the length of the sequence, slice extracts through to the end of the sequence (arr.length)


## Return a value
## find()  
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find

The find() method returns the value of the first element in the array that satisfies the provided testing function. Otherwise undefined is returned.

```javascript
const value=arr.find(callback(currentValue[, index[, array]]){...........}[, thisArg])
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
const index=arr.findIndex(callback(currentValue[, index[, array]]){...........}[, thisArg])
```
```javascript
var array1 = [5, 12, 8, 130, 44];

function findFirstLargeNumber(element) {
  return element > 13;
}

console.log(array1.findIndex(findFirstLargeNumber));
// expected output: 3
```
## every()
## some()

## join()

# Return undefined
## forEach()
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

The forEach() method executes a provided function once for each array element.

forEach() executes the callback function once for each array element; unlike map() or reduce() it always **returns the value undefined and is not chainable**. The typical use case is to execute side effects **at the end of a chain**.

If the array is modified during iteration, other elements might be skipped.
The following example logs "one", "two", "four". When the entry containing the value "two" is reached, the first entry of the whole array is shifted off, which results in all remaining entries moving up one position. Because element "four" is now at an earlier position in the array, "three" will be skipped. forEach() does not make a copy of the array before iterating.
```javascript
var words = ['one', 'two', 'three', 'four'];
words.forEach(function(word) {
  console.log(word);
  if (word === 'two') {
    words.shift();
  }
});
// one
// two
// four
```


# Return an iterator
## keys()
## entries()
## values()
 -- arr`[Symbol.iterator]`()
