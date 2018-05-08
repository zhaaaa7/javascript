## how inline javascript work

wrap " " around the function body

```
<form action="challenge5.html" onsubmit="return checkForm();">

is the same as : 
		
documentByTagName("form").addEventListener("submit", function () {
		return checkForm();
	} 
```


## Event propagation
https://javascript.info/bubbling-and-capturing

https://davidwalsh.name/event-delegate

https://www.sitepoint.com/event-bubbling-javascript/

a snippet code, adapted from https://stackoverflow.com/questions/4616694/what-is-event-bubbling-and-capturing

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>test</title>
    <style>
        p {
        line-height: 1;
        }

        div {
            display:inline-block;
            padding: 5px;

            background: #fff;
            border: 1px solid #aaa;
            cursor: pointer;
        }

        div:hover {
            border: 1px solid #faa;
            background: #fdd;
        }
    </style>

  </head>
  <body>
      <div>1
        <div>2
          <div>3
              <div>4
                  <div>5</div>
              </div>
          </div>
        </div>
      </div>
      <section id="log"></section>

      <script>


      var logElement = document.getElementById('log');

      function log(msg) {
          logElement.innerHTML += ('<p>' + msg + '</p>');
      }

      function capture(e) {
          log('capture: ' + 'this: '+this.firstChild.nodeValue.trim()+', currentTarget:  '+e.currentTarget.firstChild.nodeValue.trim()+ ', target: '+e.target.firstChild.nodeValue.trim());
      }

      function bubble(e) {
          log('bubble: ' + this.firstChild.nodeValue.trim());
      }

      var divs = document.getElementsByTagName('div');
      for (var i = 0; i < divs.length; i++) {
          divs[i].addEventListener('click', capture, true);
          divs[i].addEventListener('click', bubble, false);
      }
      </script>
  </body>

</html>

```
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/event.png" alt="event" width="500px"/>


## event loop
https://www.youtube.com/watch?v=TbCgGWe8LN8&list=PL7pEw9n3GkoW5bYOhVAtmJlak3ZK7SaDf&index=26
https://github.com/techsithgit/setTimeout
https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop
https://zhuanlan.zhihu.com/p/26238030

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

