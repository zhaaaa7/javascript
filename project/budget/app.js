//data
var budgetController=(function(){
    var Expense= function(id,description,value){
        this.id=id;
        this.description=description;
        this.value=value;
        this.percentage=-1;
    };

    Expense.prototype.calPercentage=function(totalIncome){
        if(totalIncome>0){
            this.percentage=Math.round(this.value/totalIncome*100);
        }else {
            this.percentage=-1;
        }
        
    };

    Expense.prototype.getPercentage=function(){
        return this.percentage;
    };

    var Income= function(id,description,value){
        this.id=id;
        this.description=description;
        this.value=value;
    };

    var data={
        allItems:{
            exp:[],
            inc:[]
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1, //doesn't exist
    };

    var calculateTotal=function(type){
        var sum=0;
        data.allItems[type].forEach(function(cur){
            sum+=cur.value;
        });
        data.totals[type]=sum;
    };

    

    return {
        addItem: function(type, des,val){
            var ID, newItem;
            //create new item id
            if(data.allItems[type].length>0){
                // select the last one in the array, get the id, and +1, and be the new item id
                //[1,2,3], nextid=6
                //if deleting some item: [1,2,4,6,8], nextid=9
                ID = data.allItems[type][data.allItems[type].length-1].id+1;
            }else {
                ID=0;
            }

            // create new Expense/Income instance
            if(type==='exp'){
                newItem= new Expense(ID, des,val);
            }else if(type==='inc'){
                newItem= new Income(ID, des,val);
            }

            //add new item to data structure
            data.allItems[type].push(newItem);
            return newItem;
        },

        calculateBudget: function(){
            //1.cal total income and expense
            calculateTotal('exp');
            calculateTotal('inc');
            //2.cal budget: income-expense
            data.budget=data.totals.inc-data.totals.exp;

            //3.cal percentage of overall expense of income
            if(data.totals.inc>0){
                data.percentage=Math.round(data.totals.exp/data.totals.inc*100);
            }else{
                data.percentage=-1;
            }
            
        },

        // cal percentage of each Expense
        calculatePercentages: function(){
            data.allItems.exp.forEach(function(cur){
                cur.calPercentage(data.totals.inc);
            });
        },

        getPercentages: function(){
            var allPercentages=data.allItems.exp.map(function(cur){
                return cur.getPercentage();
            });
            return allPercentages;
        },

        //return data 
        getBudget:function(){
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage

            };
        },

        deleteItem: function(type, id){
            var ids, index;
            ids=data.allItems[type].map(function(current){
                return current.id;
            });

            //find the index of the given id
            index=ids.indexOf(id);

            //delete it from the item array
            if(index!==-1){
                data.allItems[type].splice(index,1);
            }


        },

        testing: function(){
            console.log(data);
        }
    };

})();

//UI
var UIController = (function(){
    var DOMstrings={
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel:'.budget__value',
        incomeLabel:'.budget__income--value',
        expenseLabel:'.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expPercentageLabel:'.item__percentage',
        dateLabel:'.budget__title--month',
    };

    var formartNumber=function(num, type){
        //rules:
        // 2000 => + 2,000.00
        // + -, 
        //2 decimal, comma
        var numSplit, sign;
        num=Math.abs(num);
        num=num.toFixed(2); // the output is string
        numSplit=num.split('.');

        //integar part
        int=numSplit[0];
        if(int.length>3){
            int.substr(0, int.length-3)+','+int.substr(int.length-3,3);
        }

        //decimal part
        dec=numSplit[1];

        //sign part
        sign = type==='exp' ? '-' : '+';
        return sign+' ' +int+'.'+dec;

    }

    var nodelistForEach=function(list,callback){
        for (var i=0;i<list.length;i++){
            callback(list[i],i); //(elem,index)
        }
    }

    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
                description:document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }
            //{type: 'inc',description: 'lala', value: 300}
            
        },

        getDOMstrings: function(){return DOMstrings;},

        addListItem: function(obj, type){
            
            var html, newHtml, element;
            //create html string
            if(type==='inc'){
                element=DOMstrings.incomeContainer;
                html='<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else if(type==='exp'){
                element=DOMstrings.expenseContainer;
                html= '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // add real data
            newHtml=html.replace('%id%',obj.id);
            newHtml=newHtml.replace('%description%',obj.description);
            newHtml=newHtml.replace('%value%',formartNumber(obj.value,type));

            //insert into DOM 's income/expense list container
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
        },

        clearFields: function(){
            var fields, fieldsArray;
            fields=document.querySelectorAll(DOMstrings.inputDescription+', '+DOMstrings.inputValue); 
            //turn NodeList into an array
            fieldsArray=Array.prototype.slice.call(fields);
            //clear all text input
            fieldsArray.forEach(function(current,index, array){
                current.value='';
            });
            //get the description input focused
            fieldsArray[0].focus();
        },

        displayBudget: function(obj){
            var type= obj.budget>0 ? 'inc': 'exp';
            document.querySelector(DOMstrings.budgetLabel).textContent=formartNumber(obj.budget,type);
            document.querySelector(DOMstrings.incomeLabel).textContent=formartNumber(obj.totalInc,'inc');
            document.querySelector(DOMstrings.expenseLabel).textContent=formartNumber(obj.totalExp,'exp');
           

            if(obj.percentage>0){
                document.querySelector(DOMstrings.percentageLabel).textContent=obj.percentage+'%';
            }else {
                document.querySelector(DOMstrings.percentageLabel).textContent='--';
            }
        },

        displayPercentages: function(percentages){
            var fields=document.querySelectorAll(DOMstrings.expPercentageLabel);
            nodelistForEach(fields,function(cur,index){
                if(percentages[index]>0){
                    cur.textContent=percentages[index]+'%';
                }else {
                    cur.textContent='--'
                }
                
            });
        },

        deleteListItem: function(selectorID){
            var el=document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        displayMonth: function(){
            var now, year, month, months;
            now= new Date();
            year=now.getFullYear();
            month=now.getMonth();
            months=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
            document.querySelector(DOMstrings.dateLabel).textContent=months[month] +', ' +year;
        },

        changedType: function(){
            var fields=document.querySelectorAll(
                DOMstrings.inputType+','+DOMstrings.inputDescription+','+DOMstrings.inputValue
            );

            nodelistForEach(fields,function(cur){
                cur.classList.toggle('red-focus');
            });

            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
        },
    };

})();


//control
var controller=(function(budgetCtrl,UICtrl){
    
    var setupEventListeners=function(){
        var DOM=UIController.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);

        document.addEventListener('keypress',function(event){
            if(event.keyCode===13 || event.which===13){
                ctrlAddItem();
            }
        });

        //delegate delete Expense/Income item
        document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change',UIController.changedType);
    };

    var updateBudget=function(){
        //1. calculate the budget
        budgetController.calculateBudget();

        //2. read budget from the budgetController
        var budget=budgetController.getBudget();
        
        //3. display budget on UI
        UIController.displayBudget(budget);

    };

    var updatePercentages=function(){
        //1.calculate the percentage
        budgetController.calculatePercentages();

        //2.read percentage from the budgetController
        var percentages=budgetController.getPercentages();
          
        //3.display percentage on UI
        UIController.displayPercentages(percentages);

    };

    var ctrlAddItem= function(){
        //get the input data
        var input, newItem;
        input= UICtrl.getInput();
        console.log(input);

        //add the item only if thr input is validated
        if(input.description!==''&& !isNaN(input.value) && input.value>0){
            //1.add item to budget controller
            var newItem=budgetCtrl.addItem(input.type, input.description, input.value);

            //2.add new item to UI
            UIController.addListItem(newItem,input.type);

            //3.clear the fields
            UIController.clearFields();

            //4.calculate the budget
            updateBudget();

            //5.update percentage
            updatePercentages();
        }    
    }

    var ctrlDeleteItem=function(event){
        var itemID, splitID, type, ID;
        //find the Income/Expense item
        itemID=event.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemID){
            //itemID: id="inc-%id%"
            splitID=itemID.split('-');
            type=splitID[0];
            ID=parseInt(splitID[1]); //parse it to number
            
            //1.delete from data structure
            budgetController.deleteItem(type,ID);

            //2.delete from UI
            UIController.deleteListItem(itemID);

            //3.update and show the new budget
            updateBudget();

            //4.update percentage
            updatePercentages();
        }
    };

    return {
        init: function(){
            setupEventListeners();
            UIController.displayMonth();
            UIController.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1

            });
        }
    };

})(budgetController,UIController);




controller.init();
