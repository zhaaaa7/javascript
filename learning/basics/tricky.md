1. for loop
```js
for (var i = 0; i < 3; i++) {
        console.log(i);
        var i = 'abc';
        console.log(i);
    }
//0
//abc



for (let i = 0; i < 3; i++) {
        console.log(i);
        i = 'abc';
        console.log(i);
    }
//0
//abc

for (let i = 0; i < 3; i++) {
        let i = 'abc';
        console.log(i);
    }
//abc
//abc
//abc
```
