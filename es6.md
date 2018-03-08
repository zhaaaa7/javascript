## map
why need a map
```javascript
const x={};
const a={};
const b={num:1};

x[a]='a';
x[b]='b';

console.log(x); //{ '[object Object]': 'b' }
```
how map works
```javascript
const a={};
const b={num:1};
const map= new Map();
map.set(a,'a').set(b,'b');
console.log(map); //Map { {} => 'a', { num: 1 } => 'b' }
map.delete(b);
```
map has iterator

```javascript
for (let [key,value] of map.entries()){
  console.log(key,value);
  //{} 'a'
  //{ num: 1 } 'b'
}

const arr=[...map];
console.log(arr); //[ [ {}, 'a' ], [ { num: 1 }, 'b' ] ]

```
weakmap

```javascript
{
  let x={a:[1,2]}; //block varibale
  var map=new Map();
  map.set(x,'set x');
};

console.log(map); //but still exists here, Map { { a: [ 1, 2 ] } => 'set x' }


{
  let x={a:[1,2]}; 
  var weakmap=new WeakMap();
  weakmap.set(x,'set x');
};

console.log(weakmap); //WeakMap {}, memory is cleared

```

```javascript

```


```javascript

```

```javascript

```

```javascript

```
```javascript

```
```javascript

```

```javascript

```

```javascript

```
```javascript

```

```javascript

```
```javascript

```

