1. execute the call back after some time after you stop triggering the event 
```
<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="IE=edge, chrome=1">
    <title>debounce</title>
    <style>
        #container{
            width: 100%; height: 200px; line-height: 200px; text-align: center; color: #fff; background-color: #444; font-size: 30px;
        }
    </style>
</head>

<body>
    <div id="container"></div>
    <script>
      var count = 1;
      var container = document.getElementById('container');

      function getUserAction() {
        container.innerHTML = count++;
        console.log('[in getUserAction]',this);
      };

      function debounce(func, wait) {
        var timeout;
        console.log('[in debounce]',this);   // show only once when the file is loaded for the first time.
        return function () {
            console.log('[in returned]',this);
            clearTimeout(timeout)
            timeout = setTimeout(func, wait);
        }
      }
      container.onmousemove = debounce(getUserAction, 1000);

    </script>
</body>

</html>

```
