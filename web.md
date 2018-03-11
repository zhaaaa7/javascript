## Bubbling and capturing
https://javascript.info/bubbling-and-capturing
https://davidwalsh.name/event-delegate


## event queue
https://www.youtube.com/watch?v=TbCgGWe8LN8&list=PL7pEw9n3GkoW5bYOhVAtmJlak3ZK7SaDf&index=26
https://github.com/techsithgit/setTimeout
https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop

### tasks and microtasks
https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/


## web worker
ajax is non-blocking, web worker realize multi-thread.
communication mechanism between the worker and page (UI) : postMessage() and onMessage()
It has no access to window object, document object, and parent object.

In main script
```javascript
if(window.Worker){
  let myWorker= new Worker('worker.js');
  let message={addThis:{num1:1,num2:2}};
  myWorker.postMessage(message);
  myWorker.onMessage=function(e){
    console.log(e.data.result);
  };
}

```
In worker.js
```javascript
this.onMessage=function(e){
  if(e.data.addThis!==undefined){
    this.postMessage({result:e.data.addThis.num1+e.data.addThis.num2});
  }
};
```
## recursion
```javascript
function factorial (n) {
  if (n < 2) {
    return 1;
  } else {
    return n * factorial(n-1);
  }
}
```
Tail-recursive
```javascript
function factorial (n) {
  function fact(n, accumulator) {
    if (n < 2) {
      return acc;
    } else {
      return fact(n-1, n * accumulator);
    }
  }
  return fact(n, 1)
}
```
