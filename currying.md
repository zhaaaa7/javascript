1. unkown argument length
```javascript
function createCurry(func, args) {

    var arity = func.length; // the length of parameter of the curried function
    var args = args || [];   // the length of already existing arguments

    return function() {
        var _args = [].slice.call(arguments); // turn arguments object of the returned function into normal array
        console.log('arguments',arguments);
        [].push.apply(_args, args);
        console.log('_args',_args);

        // if the length of the arguments object < func.length，continue collecting argument
        if (_args.length < arity) {
            return createCurry.call(this, func, _args);
        }

        // 参数收集完毕，则执行func
        return func.apply(this, _args);
    }
}

function A(a, b, c) {
    console.log(a+b+c);
}

var _A = createCurry(A);

console.log(_A);


_A(1, 2)(3);


//execution result:
//arguments { [Iterator]  '0': 1, '1': 2 }
//_args [ 1, 2 ]
//arguments { [Iterator]  '0': 3 }
//_args [ 3, 1, 2 ]
```
