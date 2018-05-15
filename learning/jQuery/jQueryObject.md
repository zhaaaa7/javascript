### DOM object and jQuery object
1. We use javascript to use the DOM API and get DOM object.
```javascript
var domObj = document.getElementById("id"); //DOM object
```

2. We use `$()` selector to use the DOM API and get jQuery object.
```javascript
var $obj = $("#id"); //jQueryobject
```

3. DOM object and jQuery object each has their own methods

```javascript
document.getElementById("foo").innerHTML;


$("#foo").html(); 
```

4. Usually, jQuery object is saved in a variable begins with `$`:
```javacript
var $variable = jQuery object;

var variable = DOM object;
```

### jQuery object
1. A jQuery object contains a collection of Document Object Model (DOM) elements that have been created from an HTML string or selected from a document. 
2. The jQuery object itself behaves much like an array; it has a length property and the elements in the object can be accessed by their numeric indices [0] to [length-1]. Note that a jQuery object is not actually a Javascript Array object, so it does not have all the methods of a true Array object such as join().
3. Most frequently, you will use the jQuery() function to create a jQuery object. jQuery() can also be accessed by its familiar single-character alias of $(). 
4. jQuery() / $() is a factory.

### conversion between jQuery and DOM object

1. jQuery -> DOM

`[index]` or `get(index)`
```javascript
var $cr=$("#cr"); 

var cr = $cr[0]; 
var cr=$cr.get(0);

//then you can use a DOM object method
alert(cr.checked); 
```

2. DOM -> jQuery

`$(DOM object)`
```javascript
var cr=document.getElementById("cr"); 
//to jQuery object
var $cr = $(cr); 
````

### example
1. .each() method
```javadcript
   $(document.body).click(function () {
     $( "div" ).each(function (i) {
       if ( this.style.color != "blue" ) {
         this.style.color = "blue";
       } else {
         this.style.color = "";
       }
     });
   });
```
`this.style.color` indicates `this` is a DOM element., which means $("div") contains a collection of Document Object Model (DOM) elements.
