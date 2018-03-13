1. The $() function creates a jQuery object with methods that can trigger actions on the elements targeted inside the parentheses.

2. Event handlers are not callback functions. They accept a callback function as a parameter. 
They are jQuery methods that executes a callback function when an event occurs.
```javascript
$(‘.hide').on('click', () => {
  `$('div').hide();
});
```
When an element of the class hide is clicked, all div elements are hidden.


3. .slideDown() on an element will make it slide down into view

4. you can pass an event listener and callback function to the .on() method. (bind an event to an element)
```javascript
//'click' is an event listener. The .on() method binds the event listener to a jQuery object.
$('.some-class').on('click', () => {
  $('.some-class').show();
});
```

5. event.currentTarget targets the selected element.

6. chaining
```javascript
$('.menu-class').on('mouseenter', () => {
  $('.nav-menu').show();
}).on('mouseleave', () => {
  $('.nav-menu').hide();
});
```
uses chaining to trigger show and hide effects on mouse enter and mouse leave.

7. animation
You can use '+=' or '-=' for relative changes in CSS properties.
```javascript
height: '+=10px'
```
8. next() -- does not take any arguments.
```javascript
// Wrong!!!
$('#go').on('click',() => {
  $('#rest').next('p').toggleClass('highlight')
});
```
