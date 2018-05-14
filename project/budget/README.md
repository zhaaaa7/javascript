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


2. controller tell what other modules to do: call the public methods in "c" in "mvc", get the data and use the data


3. inserAdjacentHTML()

4. querySelectorAll returns a NodeList, similar to array but lack useful methods, use `slice` to convert the list to array

5. forEach(function(current,index,array){...})

6. philosophy: return functions simply setting data or getting data


7. parseFloat to convert input string

8. testing in data control module to see the data structure

9. consider edge case

10. when you call a method on a string primitive, js engine wrap around it and coerce it to a string object

11. can only delete a child of a parent, not the child it self

12. how callback functions receive arguments
```
function nodeListForEach(nodelist,callback) {
    for (var i=0; i< list.length; i++) {
        callback(list[i],i);
    }
}
```
The callback here will receive list item and index, you just need to specify how to deal with the arguments when calling this function.
```
var fields=document.querySelectorAll(...);
nodeListForEach(fields, function(cur,index){
    cur.textContent=percentages[index]+'%';
})

```

13. toFixed(2) is a Number.prototypr method, returns a string

14. Date object
```
var now= new Date();
year=now.getFullYear();
month=now.getMonth();
```

15. `change` event on select 


#### in UI controller

1. value of a select is defined in the html

`document.querySelector('.add__type').value; // inc / exp`

2. a private object to store DOMstrings (DOM selectors), a public method to return the object

3. add new item to UI
```
addListItem(obj, type){
    // 1. add HTML string placeholder: html= '...';
    
    // 2. replace with actual data : html.replace('%id%',obj.id);
    
    // insert html into the DOM: element.inserAdjacentHTML('beforeend',newhtml);
}
```
4. clear input field
```
fields = document.querySelectorAll('.. , ..');
fieldsArr=Array.prototype.slice.call(fields);

forEach(function(current,index,array){
    current.value='';
})

fieldsArr[0].focus()
```
5. convert input string to a number `parseFloat`

6. deleteListItem from UI
```
deleteListItem: function(selectorID){
    var el=document.getElementById(selectorID);
    el.parentNode.removeChild(el);
}
}
```

7. display percentages on UI

create a forEach method for nodeList
```
function nodeListForEach(nodelist,callback) {
    for (var i=0; i< list.length; i++) {
        callback(list[i],i);
    }
}
```
```
var fields=document.querySelectorAll(...);
nodeListForEach(fields, function(cur,index){
    cur.textContent=percentages[index]+'%';
})

```
8. formatting the strings on UI
```
formatNumber: function(num, type){
    //+, -
    
    // 33.33
    
    // 20,300
    
    num=Math.abs(num);
    num=num.toFixed(2);
    
    numSplit=num.split('.');
    int=numSplit[0];
    dec=numSplit[0];
    
    int.substr(0,int.length-3)+','+int.substr(int.length-3,3); 2310->2.310
    
    return type + int + '.'+ dec;
}
```

9. change the outline of the form part when editing expenses
```
changedType: function(){
    var fields=document.querySelectorAll(..+','+..+','+..);
    nodeListForEach(fields, function(cur){
        cur.classList.toggle('red-focus');
    });
}

#### in model controller (budgetController)
1. use a function constructor to create following Expense objects and Income objects, write methods on the .prototype
```
var exp=new Expense(1,'buy a car', 30000);
```

2. private data structure: store expense and income in an array
```
var data={
    allItems: {
        exp:[],
        inc:[]
    },
    totals: {
        exp:0,
        inc: 0
    }, 
    budget: 0, 
    percentage: -1
};
```

3. add a new item to the data structure
3-1. use designed `type` property 
```
//the type can be either exp or inc
data.allItems[type].push(newItme)
```

3-2. add `ID` for every item: add 1 to the last item's id
```
if(data.allItems[type].length > 0){
    ID=data.allItems[type][data.allItems[type].legnth - 1].id
} else {
    ID=0;
}
```

4. calculate budget
```
data.allItems[type].forEach(function(cur){
    sum+=cur.value;
});

data.totals[type]=sum;
```

5. delete item
```
deleteItem=(type,id) {
    var ids= data.allItems[type].map(function(current){
        return current.id;
    })
    
    var index= ids.indexof(id);
    
    if(index!==-1){
        data.allItems[type].splice(index,1);
    }
}

```

6. calculate expense percentage
```
Expense=function(){
  this.percentage=-1;
}


Expense.prototye.calcPercentage=function(totalIncome){
    this.percentage=....
}

Expense.prototye.getPercentage=function(){
    return this.percentage;
}

```

```
calculatePercentage: funtion(){
    data.allItems.exp.forEach(function(cur){
        cur.calcPercentage(data.totals.inc);
    });
}

getPercentage: function(){
  var allPer=data.allItems.exp.map(function(cur){
     return cur.getPercentage();
  })
  
  return allPer;
}
```



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

3. check if there is validated input 
```
if(input.description !== "" && !isNaN(input.value) && input.value>0)
```
4. updateBudget
```
//calculate the budget

// return the budget

// dipslay on UI
```

5. class="container" is where we add event delegation: ctrlDeleteItem
6. to get the `id` attribute of the list item to be deleted
`itemID=event.target.parentNode.parentNode.parentNode.parentNode.id`
7. `itemID` is like `inc-1` or `exp-1`, to get the type and number
```javascript
splitID=itemID.split('-');
type=splitID[0];
ID= splitID[1];
```

convert the string ID to number ID parseInt(ID)
```
budgetCtrl.deleteItem(type, parseInt(ID));
UICtrl.deleteListItem(itemID);
```












### event delegation
1. attach event handler to the target element's parents and wait for the event to bubble up to the parent.
2. use `event.target` property to do what we want to do
3. use cases: a) an element with lots of child elements that we are interested in
              b) we want to attach an event handler to an element that is not yet in the DOM when the page is loaded
       

