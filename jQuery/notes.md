1. 
```javascript
const login = document.getElementById('login');
const loginMenu = document.getElementById('loginMenu');

login.addEventListener('click', () => {
  if(loginMenu.style.display === 'none'){
    loginMenu.style.display = 'inline';
  } else {
    loginMenu.style.display = 'none';
  }
});
```
The code below accomplishes the same behavior with jQuery:
```javascript
$('#login').click(() => {
  $('#loginMenu').toggle()
});
```

2. jQuery Methods
The JavaScript language represents an infinite supply of Lego blocks — the possibilities are endless but time-consuming. The pre-made Lego structures are like jQuery methods. You can use these methods to add dynamic behavior, such as .hide(), .show(), .fadeIn(), .fadeOut() etc., to HTML elements.

3. The document is loaded from top to bottom. So the style dependencies in the <head> will load first, then the structural elements in the <body> will load next. It has become common practice to link the main JavaScript file at the bottom of the HTML document because a good deal of the content of the script will require that the dependencies, style sheets and elements exist before the browser can run the JavaScript that uses and references those things.
  
When you add the jQuery library to your project in the next exercise, you will do so on the line before the </body> tag. Because HTML files load from top to bottom, adding the jQuery library at the bottom of your project will ensure that it will not affect the HTML (structure) and CSS (style) load times.

4. Adding jQuery
To include jQuery, we use a <script> tag as follows:
```javascript
<script
  src="https://code.jquery.com/jquery-3.2.1.min.js"
  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  crossorigin="anonymous"></script>
  ```
In this example, the jQuery library is loaded from the jQuery content delivery network (CDN). A **CDN** is a collection of servers that can deliver content.

You must include the <script> tag in the HTML document before you link to a JavaScript file that uses the jQuery library. The integrity and crossorigin properties in the example ensure the file is delivered without any third-party manipulation.
