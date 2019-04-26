1. getElementById returns the reference to the DOM element object

2. .nextSibling returns all kinds of nodes, including the carriage return, which is “text” node

3. document.querySelector() 
https://stackoverflow.com/a/46845715

```js
document.querySelector('.class1.class2'); //.class1.class2 indicates an element with both classe
```



1. HTML tag needs to be parsed by broswer so as to become DOM nodes.

2. window.onload -- all resources all loadwd

   window.DOMContentLoaded -- DOM tree is built
   
   
   
### HTML event
```
<div onclick="show()"></div>
```
### DOM0
级事件处理程序 （用得比较多）：先把元素取出来，然后为其属性添加一个事件的方法叫DOM0级处理程序。
 它是一种较传统的方式：把一个函数赋值给一个事件处理程序的属性。
 优点：简单，跨浏览器的优势
 ```javascript
 var btn2=document.getElementById("btn2");
 btn2.onclick=function(){alert('DOM0')};
  btn2.onclick=null;
 ```
 
 
### DOM2
 
1. two methods
```
addEventListener() 
removeEventListener()
```

2. 
```
btn3.addEventListener('click',show,false); 
// event, function, isCapturing

btn3.removeEventListener('click',show,false);
```

3. add more than one event handler
btn3.addEventListener('click',showMes);
btn3.addEventListener('click',show);

### IE
```
attachEvent("onclick", function);
detachEvent("onclick", function);
```


### cross browser
```javascript
var eventHandler = {
    add=:function(elem,type,handle){
        if(elem.addEventListener){    //DOM2
            elem.addEventListener(type,handle,false);
        }else if(elem.attachEvent){    //IE
            elem.attachEvent('on'+type,handle);
        }else{
            elem['on'+type]=handle;    //DOM0
        }
    },


    remove:function(elem,type,handle){
        if(elem.removeEventListener){   //DOM2
            elem.removeEventListener(type,handle,false);
        }else if(elem.detachEvent){   //IE
            elem.detachEvent('on'+type,handle);
        }else{
            elem['on'+type]=null;   //DOM0级事件处理程序,null赋值后，相当于取消操作
        }
    }
}
eventHandler.add(btn1,"click",show);
```

### event object
1. property

e.type --> click, onmouseover

e.target --> DOM element triggers the event

2. method
e.stopPropagation() 

e. preventDefault()  --> prevent the jumping behavior of `<a>`

3. event delegation
```js
//事件代理
    function bindEvent(elem, type, selector, fn) {
        if (fn == null) {
            fn = selector;
            selector = null;
        }
        elem.addEventListener(type, function (e) {
            if (selector) {
                var target = e.target;
                if (target.matches(selector));
                fn.call(target, e);
            } else {
                fn(e);
            }
        });



    }

    //div1 代理 所有a子节点的事件
    bindEvent(div1,'click','a',function(e){
        e.preventDefault();
        console.log(this.textContent);
    });
```
