## function



## functional programming

```javascript
function mapForEach(arr, fn) {
    
    var newArr = [];
    for (var i=0; i < arr.length; i++) {
        newArr.push(
            fn(arr[i])   //change the element using the passed function
        )
    };
     
    return newArr; // return something new, not chaning the original array
}

var arr1 = [1,2,3];
console.log(arr1);


var arr2 = mapForEach(arr1, function(item) {
   return item * 2; 
});
console.log(arr2);


/*var arr3 = mapForEach(arr1, function(item) {
   return item > 2; 
});
console.log(arr3);
*/

var checkPastLimit = function(limiter, item) {
    return item > limiter;   
}


var arr4 = mapForEach(arr1, checkPastLimit.bind(this, 1)); //set limiter==1
console.log(arr4);


var checkPastLimitSimplified = function(limiter) {
    return function(limiter, item) {
        return item > limiter;   
    }.bind(this, limiter);                         
    //create a function with limiter preset
};

var arr5 = mapForEach(arr1, checkPastLimitSimplified(1));
console.log(arr5);
```
