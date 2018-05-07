1.  reverse string
```javascript
function reverseString(str) {
  str_list=str.split('');
  str_list.reverse();
  console.log(str_list);
  new_str=str_list.join('');
  return new_str;
}

reverseString("hello");
```


2. closure
```javascript
function sandwichMaker(magicIngredient) { 
	function make(filling) {
		return magicIngredient + " and " + filling; 
		}
	return make; 
}
var hamAnd = sandwichMaker("ham");
console.log(hamAnd("cheese")); //harm and cheese
```


```javascript
function wrapElements(a) {
	var result = [], i, n;
	for (i = 0, n = a.length; i < n; i++) {
		result[i] = function() { return [i,a[i]]; }; 
		console.log(i);//0,1,2
	}
return result; 
}
var wrapped = wrapElements([10,12,13]); 
console.log(wrapped);//[[f],[f],[f]]
var f = wrapped[0];
console.log(f()); // [3,undefined]
```
