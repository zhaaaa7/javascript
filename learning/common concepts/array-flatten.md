```javascript
var arr = [1, [2, [3, 4]]];
```
1. recursion

```javascript
function flatten(arr){
  var res = [];
  for(var i=0;i<arr.length;i++){
    if(Array.isArray(arr[i])){
      res = res.concat(flatten(arr[i]));
    }else{
      res.push(arr[i]);
    }
  }
  return res;
}
```

2. reduce()
```javascript
function flatten(arr){
  return arr.reduce(function(prev,item){
    return prev.concat(Array.isArray(item)?flatten(item):item);
  },[]);
}
```
