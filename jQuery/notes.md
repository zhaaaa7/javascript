## set up
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

The jQuery library provides a collection of methods that serve one of two purposes.

* To listen for an event — an event (e.g. clicking a button) is something the user does to trigger an action.
* To add a visual effect — a visual effect (e.g. a drop-down menu appearing when a user clicks a button) is something that changes the appearance of the web page. Events are often responsible for triggering a visual effect.


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
In this example, the jQuery library is loaded from the jQuery content delivery network (CDN). A **CDN is a collection of servers that can deliver content**.

You must include the <script> tag in the HTML document before you link to a JavaScript file that uses the jQuery library. The integrity and crossorigin properties in the example ensure the file is delivered without any third-party manipulation.
  
5. .ready()
The jQuery .ready() method waits until the HTML page's DOM is ready to manipulate. You should wrap all JavaScript behavior inside of the .ready() method. This will make sure the web page is rendered in the browser before any jQuery code executes.
```javascript
$(document).ready(() => {

}); 
```
6. Targeting by Class
```javascript
$('.product-photo').show();
```
7. Targeting by id
```javascript
$('#someId').hide();
```

8. jQuery Objects
The $ symbol is an alias for the jQuery function. The `$` symbol and `jQuery` are interchangeable.

The **jQuery function** takes a parameter that targets an element, like '#navMenu', and **turns it into a jQuery object**. Then, you can call any **jQuery method** on a jQuery object.

Developers often save jQuery objects in variables, like so:
```javascript
const $jQueryObject = $('.someClass');
```
9. Event Handlers
The jQuery .on() method adds event handlers to jQuery objects. The method takes two parameters: **a string declaring the event to listen for (the handler) and a callback function to fire** when the event is detected.
```javascript
$('#login').on('click', () => {
  $loginForm.show();
})
```

10. 
```javascript
$(document).ready(() => {
  const $menuButton = $('.menu-button');
  const $navDropdown = $('#nav-dropdown');

  $menuButton.on('click', () => {
    $navDropdown.show();
  })
  
  $navDropdown.on('mouseleave', () => {
    $navDropdown.hide();
  })
})
```

## effects
1. .hide()
 When you hide an element, your browser will render the HTML as if the hidden element does not exist. It will disappear from the page and **the space that it was taking up will disappear as well**.
 ```javascript
$('.hide-arrow').on('click', () => {
  $('.shoe-information').hide();
});
```
.show()
```javascript
$('.show-arrow').on('click', () => {
  $('.shoe-information-2').show();
});
```

.toggle()
It is common for web pages to have one button that will either hide or show elements depending on their current state. We can achieve this by using the .toggle() method.
```javascript
$('.toggle-button').on('click', () => {
  $('.shoe-information-3').toggle();
});
```

2. .fadeIn() and .fadeOut()
.fadeIn() and .fadeOut() make the element appear or disappear **over a given period of time**. You can think of this as an animation. The transition between being visible and invisible happens over a duration of time.

Both .fadeIn() and .fadeOut() take an optional parameter that specifies how long the animation will take. 
```javascript
$('div').fadeOut(1000);
```
In the example above, the 1000 argument is optional; you don't need to put a number between the parentheses. This number represents the number of **milliseconds** it takes for the animation to complete. If no argument is given, the **default animation duration is 400 milliseconds**.

.fadeToggle()
This method is similar to .toggle(). Like the other fade methods, .fadeToggle() can take an argument that sets the duration of the effect.
```javascript
$('div').fadeToggle(1000);
```
3. Sliding

By using sliding effects, an element on your web page will slide up or down into place instead of appearing or disappearing. Just like with the other effects, sliding can be applied to any element on your page whether it be an image, a video, or text.

Sliding methods are animations; they happen over a period of time. 
```javascript
$('.menu-button').on('click', () => {
  $('.menu-content').slideDown('slow');
});
```

## Mouse Events
1. click
```javascript
$('.login-button').on('click', () => {
    $('.login-form').show();
  })
```
2. mouseenter
The mouseenter event triggers a callback function when a user enters the area that a targeted element occupies.
```javascript
$('.menu-button').on('mouseenter',()=>{
    $('.nav-menu').show();
  })
```

3. mouseleave
```javascript
$('.nav-menu').on('mouseleave',()=>{
    $('.nav-menu').hide();
  })
```

4. Chaining Events
jQuery also allows us to chain multiple methods. Instead of **re-declaring the HTML element** you're selecting, you can append one event to another. 
```javaacript
 $('.product-photo').on('mouseenter',()=>{
    $('.product-photo').addClass('photo-active');
  }).on('mouseleave',()=>{
    $('.product-photo').removeClass('photo-active');
  })
```

5. currentTarget
The currentTarget attribute refers to only the .product-photo element that the learner has moused over.

```javascript
 $('.product-photo').on('mouseenter', (event) => {
    $(event.currentTarget).addClass('photo-active')
  }).on('mouseleave', event => {
    $(event.currentTarget).removeClass('photo-active')
  })
```

## style method
1. .css()
To modify CSS properties of an element, jQuery provides a method called .css(). This method accepts an argument for a CSS property name, and a corresponding CSS value.
```javascript
$('.example-class').css('color', '#FFFFFF');
```
2. To set multiple properties at once, you can pass the whole object into the .css() method as a single element.
```javascript
$('.example-class').css({
  color: '#FFFFFF',
  backgroundColor: '#000000',
  fontSize: '20px'
})
```
When referencing CSS properties in an **object, the property names are camelCased** — they are modified to have no quotes or spaces, and to start each new word with a capital letter. 

2. .animate()
The jQuery .animate() method enhances the visual possibilities by making CSS value changes over a period of time.

The first argument passed to .animate() is a JavaScript object of CSS property/value pairs that represent an element's end state.

The second parameter of the .animate() method determines how long the animation takes to complete. It is optional; if you do not provide an argument, the default value is 400 milliseconds. You can use a number (in milliseconds) or the strings 'fast' or 'slow'. 
```javascript
$('.example-class').animate({
  height: '100px',
  width: '100px',
  borderWidth: '10px'
}, 500);
```

3. .addClass()
A JavaScript file can quickly get overloaded with styles if you regularly use the `css` method to modify element styles. It's a best practice to group all of the style code in a CSS file, and use jQuery to add and remove the classes from elements — this approach aligns to a design principle called separation of concerns.

**Separation of concerns** is a design principle stating that code should be separated based on its purpose in a program. In web development, that generally means the structure of a page is defined in an HTML document, styles are stored in a CSS file, and code that defines dynamic behavior is stored in a JavaScript file.

To keep CSS properties in a CSS file, jQuery can add a CSS class to an element with a method named addClass. It's syntax looks like this:
```javascript
$('.example-class').addClass('active');
```
In the example above:
.addClass() is called on the jquery `.example-class` selector.
.addClass() adds the `'active'` class to all .example-class elements.
Notice that the argument passed to addClass **does not have a period preceding it. This is because it expects a class**, and therefore only needs the name of the class.

