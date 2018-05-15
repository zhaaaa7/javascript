### DOM object and jQuery object
1. We use javascript to use the DOM API and get DOM object.

2. We use `$()` selector to use the DOM API and get jQuery object.
```javascrpt
var domObj = document.getElementById("id"); //DOM object
var $obj = $("#id"); //jQueryobject
```

3. DOM object and jQuery object each has their own methods

```javascript
document.getElementById("foo").innerHTML;


$("#foo").html(); 
```


### jQuery object
1. A jQuery object contains a collection of Document Object Model (DOM) elements that have been created from an HTML string or selected from a document. 
2. The jQuery object itself behaves much like an array; it has a length property and the elements in the object can be accessed by their numeric indices [0] to [length-1]. Note that a jQuery object is not actually a Javascript Array object, so it does not have all the methods of a true Array object such as join().
3. Most frequently, you will use the jQuery() function to create a jQuery object. jQuery() can also be accessed by its familiar single-character alias of $().


jQuery对象就是一个数组对象，其实就是选择出来元素的数组集合

jquery对象转换成 dom对象

jquery提供了两种方法将一个jquery对象转换成一个dom对象，即[index]和get(index)。

var $cr=$("#cr"); //jquery对象
var cr = $cr[0]; //dom对象 也可写成 var cr=$cr.get(0);
alert(cr.checked); //检测这个checkbox是否给选中



dom对象转换成jquery对象
对于一个dom对象，只需要用$()把dom对象包装起来，就可以获得一个jquery对象了，方法为$(dom对象);

var cr=document.getElementById("cr"); //dom对象
var $cr = $(cr); //转换成jquery对象



 平时用到的jquery对象都是通过$()函数制造出来的，$()函数就是一个jquery对象的制造工厂.



如果获取的对象是 jquery对象，那么在变量前面加上$,这样方便容易识别出哪些是jquery对象,例如:
var $variable = jquery对象;
如果获取的是dom对象，则定义如下:
var variable = dom对象

这样就能区别



下面来了解一下

在jQueryAPI文档里面的.each()

<script>
    $(document.body).click(function () {
      $( "div" ).each(function (i) {
        if ( this.style.color != "blue" ) {
          this.style.color = "blue";
        } else {
          this.style.color = "";
        }
      });
    });
</script>
其实在这里就能看出来this.style.color是DOM对象

也就是说$("div")选择出来的是一个对象数组，在each()遍历的时候this代表每一个被遍历的元素，也就是当前元素
