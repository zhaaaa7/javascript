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

```javascript
var controller=(function(budgetCtrl,UICtrl){
    var z=budgetCtrl.publicTest(5);
    return {
        another: function(){
            console.log(z);  //28
        }
    };

})(budgetController,UIController);
```


## notes
1. detect when user press the "Enter" key
```javascript
document.addEventListener('keypress',function(event){
    // keycode property of KeyboardEvent, for "Enter" is 13
    // for old browsers, the property is which
    if(event.keycode === 13 || event.which===13) {
       console.log("Enter was pressed");
    }
});
```

The event here is a KeyboardEvent, `KeyboardEvent.__proto__=== UIEvent`
keyboard keycode: http://keycodes.atjayjo.com


2. controller tell what other modules to do: call the public methods in "c" in "mvc"

#### in UI controller

1. value of a select is defined in the html

`document.querySelector('.add__type').value; // inc / exp`

2. a private object to store DOMstrings (DOM selectors), a public method to return the object


#### in controller
1. `DOM=UICtrl.getDOMstring();`

2. initialization function
```javascript
setupEventListeners=function(){};
return {
    init: function(){
        setupEventListeners();
    }
};
````


#### in model controller (budgetController)
1. use a function constructor to create following Expense objects and Income objects, write methods on the .prototype
```
var exp=new Expense(1,'buy a car', 30000);
```

2. data structure: store expense and income in an array
```
var data={
    allItems: {
        exp:[],
        inc:[]
    },
    totals: {
        exp:0,
        inc: 0
    }
};
```






8. querySelectorAll returns a list, similar to array but lack useful methods

9. parseFloat to convert input string

10. testing in data control module to see the data structure

11. edge case

12. event.targetElement

13. when you call a method on a string primitive, js engine wrap around it and coerce it to a string object

14. can only delete a child of a parent not the child it self

15. toFixed(1) is a Number.prototypr method, returns a string
