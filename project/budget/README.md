## structure of the app

### To-do list
1. add event handler
2. get input values
3. add new item to data structure
4. add new item to UI
5. calculate budget

### mvc pattern
1. separation of concerns
2. connect the separated module

<img src="" alt="todo list mvc">


### modules -- closures and IIFEs
1. important aspect of robust application's architecture
2. keep the units of code clearly separated and organized
3. encapsulate some data into privacy and expose other data publicly (code encapsulation)

4. IIFEs are **just anonymous functions wrapped in parentheses**

5. closure: the inner funtion always has access to variable in the outer funtion  even after it is returned



```javascript
// budgetController is a object with all the public functions
var budgetController=(function(){
    var x=23;
    
    //private method
    var add=function(a){
        return x+a;
    };
    // public method
    return {
        publicTest : function(b){
            return add(b);
        }
    };
})();
```
```javascript
var UIController = (function(){...})();
```
```
```javascript
var controller=(function(budgetCtrl,UICtrl){
    var z=budgetCtrl.publicTest(5);
    return {
        another: function(){
            console.log(z);
        }
    };

})(budgetController,UIController);
```



5. KeyboardEvent, keycode

6. controll tell what other modules to do
7. value of a select is defined in the html

8. querySelectorAll returns a list, similar to array but lack useful methods

9. parseFloat to convert input string

10. testing in data control module to see the data structure

11. edge case

12. event.targetElement

13. when you call a method on a string primitive, js engine wrap around it and coerce it to a string object

14. can only delete a child of a parent not the child it self

15. toFixed(1) is a Number.prototypr method, returns a string
