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

* When you click 5:

<img src="https://github.com/zhaaaa7/javascript/blob/master/img/event.png" alt="event" width="500px"/>

### example
1. the third argument: true => event capturing
2.  e.stopPropagation();
3.  e.preventDefault();

```javascript
body>
    <main>
        <div>
            <a id="XUELI" href="http://www.edu2act.net/">雪梨教育</a>
        </div>
    </main>
    <script>
        document.addEventListener('click', function() {
            console.log('雪');
        }, true);

        document.addEventListener('click', function() {
            console.log('提升品牌影响力');
        });

        document.getElementsByTagName('main')[0].addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('教育')
        });

        button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('梨')
        });
        // 雪梨教育
    </script>
</body>
```
