#### hash
The part of the URL that follows the `#` symbol, if there is one, including the `#` symbol. Empty string if the url does not contain `#` or has nothing after the `#`. You can listen for the hashchange event to get notified of changes to the hash in supporting browsers.
The hash appears at the end of a URL and is used like a bookmark in a document.



#### async function
Async function returns a promise, which resovles with the returned value of the function (can be undefined). Use `then` or `await` to deal with the function.

```javascript
async getResultes() {
    try {
        ...
    }catch(error){
        console.log(error);
    }

}
```

`then`
```javascript
getResultes().then(val=>console.log(val)); //undefined
```

`await`
```javascript
async function useResult(){
    const res=await getResultes();
    console.log(res); //undefined
}
useResult();
```
