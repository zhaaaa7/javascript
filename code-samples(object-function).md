
# Object
## overview
```javascript
const pizza={
  crust: 'thick',
  topping: 3,
  cheese: 'standard',
  toppingNumber (){
    return this.topping; //'this'can access public property and methods
  },
};

console.log(pizza.toppingNumber());
pizza.price=12;
delete(pizza.crust);
console.log(pizza);
```

private variable and methods
```javascript
 const Pizza=function(){
  let topping=3; //private variable
  let crust='thin';  
  this.cheese='extra';
  this.toppingNumber=function (){
    return topping; 
  }
  
  const getCrust=function(){
    return crust;
  };
};

const pizza2=new Pizza();
console.log(pizza2.toppingNumber());  //3
console.log(pizza2.getCrust()); // pizza2.getCrust is not a function

```
private method -- thanks to closure
```javascript
const Pizza=function(){
  let topping=3; 
  let crust='thin';  
  const getCrust=function(){
    return crust;
  };

  const realObj={};
  realObj.getCrust=getCrust;

  return realObj;
};
const pizza3=new Pizza();
console.log(pizza3.getCrust()); //thin
```

## Create an object
```javascript
//factory pattern
var peopleFactory=function(age,name){
  var temp={};
  // var temp= new Object;
  temp.age=age;
  temp.name=name;

  temp.printPerson=function(){
    console.log(this.name+' is '+this.age);
  };

  return temp;
};

var person1=peopleFactory(1,'julie1');
person1.printPerson();


//constructor pattern
var peopleConstructor=function(age,name){
	//a property of the function itself
	this.name=name;
	this.age=age;

	this.printPerson=function(){
    	console.log(this.name+' is '+this.age);
  	};
  	//no return
};

var person2 = new peopleConstructor(2,'julie2');
person2.printPerson();

//prototype pattern
var peoplePrototype=function(){

};
peoplePrototype.prototype.age=0;
peoplePrototype.prototype.name='default name';
peoplePrototype.prototype.printPerson=function(){
    	console.log(this.name+' is '+this.age);
  	};

var person3=new peoplePrototype();
//shadowing the prototype
person3.age=3;
console.log('name' in person3); //true
console.log(person3.hasOwnProperty('name')); //false

person3.printPerson();

//dynamic prototype pattern
var peopleDynamicProto=function (age,name) {
	this.age=age;
	this.name=name;
  //create the method at the first time
  if (typeof this.printPerson!=='function'){
    peopleDynamicProto.prototype.printPerson=function(){
      console.log(this.name+' is '+this.age);
    };
  }
}

var person4=new peopleDynamicProto(4,'julie');
person4.printPerson();
console.log(person4.hasOwnProperty('name')); //true
```
## Inheritance
```javascript
//inheritance
// constructor
var x=function (j) {
  this.i=0;
  this.j=j
}
x.prototype.getJ=function(){
    console.log(this.j);
  };
var x1=new x(1);
var x2=new x(2);

x1.getJ();
console.log(x1.hasOwnProperty('getJ'));
x2.getJ();

console.dir(x);

//base class object
var Job=function(){
  this.pays=true;
};
Job.prototype.log=function(){
  console.log(this.pays?'I\'ll take this job':'No.');
};
//sub-class object
var TechJob=function(title,pays){
  //1.inherit from the Job constructor
  Job.call(this);
  this.pays=pays;
  this.title=title;
}
//2.inherit from Job prototype
TechJob.prototype=Object.create(Job.prototype);
//3.set the constructor for TechJob
TechJob.prototype.constructor=TechJob;

var developer=new TechJob('js',false);
developer.log(); //=>I'll take this job
```
## Constructor
```javascript

let Car=function(color){
  this.color=color;
};
let redCar=new Car('red');
console.log(redCar);
```
What inside an (instance) object
``` 
Car {
  color:"red",
  //see _proto_ as the creator of the redCar
  _proto_:{
    //constructor is part of the creator
    //the redCar has a reference to the constructor
    contructor:f(color),
    _proto_:Object
  }
}

redCar.constructor.prototype ==> {constructor: ƒ}

```
```javascript
//without new, 'this' refers to the window object
let blueCar= Car('blue');
//********************** not a comment console.log(window.color); //blue

//to locate the error of missing 'new'
let CarNew=function(color){
  if(!new.target) throw 'Car() must be called with new';
  this.color=color;
};

//all public properties
//private property: closure
//setter and getter
let CarPrivate=function(_color){
  this.setColor=function(color){
    _color:color;
  }
  this.getColor=function(){
    return _color;
  } 
};
let yellowCar=new CarPrivate('yellow');
console.log(yellowCar.getColor());

```
* prototype
```javascript
//every constructor has a property called prototype
console.log(redCar.toString()) //[object Object]

//convert an object to a string, modify the root Object
Object.prototype.toString=function(){
  return `color:${this.color}`;
};
console.log(redCar.toString()) 

let hulu={
  color:'hulu'
};
console.log(hulu.toString()) 
```
## Object.create
```javascript
const myObject=Object.create(Object.prototype);
const noProto=Object.create(null);

//extend constructor
const Book=function(title){
  this.title=title;
}
Book.prototype={
  getTitle(){
    return this.title;
  }
};

const TextBook=function(){};

TextBook.prototype= Object.create(Book.prototype);
const csBook =new TextBook();

console.log(csBook instanceof TextBook); //true
console.log(TextBook.prototype.isPrototypeOf(csBook)); //true
```
## prototype chain
```javascript
const Car=function(){};
Car.prototype={
  log(){
    return 'I am a car';
  }
};

const ToyCar=function(){};
ToyCar.prototype=Object.create(Car.prototype);
ToyCar.prototype.log=function(){
  return 'I am a toycar'
};
ToyCar.prototype.newfu=function(){
  return 'I am a toycar'
};

const ToyCarWood=function(){};
ToyCarWood.prototype=Object.create(ToyCar.prototype);
ToyCarWood.prototype.log=function(){
  return 'I am a toycarwood'
};


const car=new Car();
const toyCar=new ToyCar();
const toyCarWood=new ToyCarWood();

console.log(car.log());
console.log(toyCar.log());
console.log(toyCarWood.log());

console.log(toyCar.__proto__); //{log: ƒ, newfu: ƒ}
console.log(ToyCar.constructor); //ƒ Object() { [native code] }
```
## extending contructor
```javascript
let Mammal=function(legs){
  this.legs=legs;
};

Mammal.prototype={
  walk(){
    return 'walking';
  },

  sleep(){
    return 'sleeping'
  }
};

let Bat=function(legs,isVegetarian){
  Mammal.call(this,legs);
  this.isVegetarian=isVegetarian;
}

console.dir(Bat); // Bat.prototype {constructor: function, __proto__: Object}

Bat.prototype=Object.create(Mammal.prototype);
console.dir(Bat);  // Bat.prototype { __proto__: walk,sleep, Object} , lose the constructor
//set the constructor back
Bat.prototype.constructor=Bat;
console.dir(Bat); //{constructor: function, __proto__: walk,sleep,Object}

Bat.prototype.fly=function(){
  return 'flying';
};

let fruitBat = new Bat(4,true);
console.log(fruitBat.walk());
console.log(fruitBat.fly());
```
## Object literal 'inheritance'
* Object.setPrototypeOf() -- set up the prototype link
```javascript
//Object.setPrototypeOf(destinationObj, sourceObj);

let toyota={
  drive(){
    return 'driving toyota';
  }
};

let camry={
  wifi(){
    return 'using wifi';
  },
  //es6
  drive(){
    return `${super.drive} camry`;
  },
};

console.dir(camry);
Object.setPrototypeOf(camry,toyota);
console.dir(camry); 
```

<img src="https://github.com/zhaaaa7/javascript/blob/master/img/obj-literal.png" alt="obj-literal" width="350px">

* Object.assign -- copy the method, causing overwriting

```javascript
let toyota={
  drive(){
    return 'driving toyota';
  },
  break(){
    return 'breaking toyota'
  }
};

let camry={
  wifi(){
    return 'using wifi';
  },
  drive(){
    return 'driving camry';
  },
};


Object.assign(camry,toyota);
console.log(camry.drive()); //the self method is overwritten

//create a new {} from toyota, shallow copy, just the properties, not prototype
Object.assign({},toyota);

// add new properties
Object.assign(toyota,{
  wifi(){
    return 'using wifi';
  }
});

//concise constructor
let c1=function (x,y,z) {
  this.x=x;
  this.y=y;
  this.z=z;
}

let c1=function (x,y,z) {
  Object.assign(this,{x,y,z});
}
```
## Function mixins
* mixin
```javascript
const jsSkill={
  knowJS(){
    return true;
  }
};

const engDegree={
  hasDegree(){
    return true;
  }
};

const backendSkill={
  knowBackend(){
    return true;
  }
}
const jsEngineer=Object.assign({},jsSkill,engDegree);
const fullStackEngineer=Object.assign({},jsSkill,engDegree,backendSkill);
```
* factory function -- close the returned object with some variable
```javascript
const Car=function(color){

  //closure, close the returned object
  let moving=false;
  return Object.assign({},{
    color:color,
    drive(){
      moving=true;
      return this;
    }, 
    isMoving(){
      return moving;
    }

  })
  
}

let redCar=Car('red');
console.log(redCar.drive().isMoving()); //true

```
* function mixin -- take an object as an argument of the function factory, get their methods and return a new object

```javascript

const humanFactory=function(obj){
  let isCrying=false;

  return Object.assign({},obj,{
    cry(){
      isCrying=true;
      return this;
    },
    isCrying(){
      return isCrying;
    }
  });

};

const person1=humanFactory({});
console.log(person1.isCrying());


const flymanFactory=function(obj){
  let isFlying=false;

  return Object.assign({},obj,{
    fly(){
      isFlying=true;
      return this;
    },
    isFlying(){
      return isFlying;
    }
  });

};

const superman=humanFactory(flymanFactory({}));
console.log(superman.fly().cry().isCrying()); //true
console.log(superman.fly().cry().isFlying()); //true
```

## ES6 class
```javascript
class Car {
  constructor(color){
    this.color=color;
  }

  drive(){
    return 'driving';
  }
}

console.log(typeof Car);    //function
const redCar=new Car('red');
```
the same as
```javascript
const Car=(function(){
  const _car=function(color){
    this.color=color;
  };
  _car.prototype.drive=function(){
    return 'driving';
  }
  return _car;
})();
```
inheritance
```javascript
class Toycar extends Car {
  constructor(color,size){
    super(color);
    this.size=size;
  }

  broken(){
    console.log('borken');
  }

  drive(){
    const canDrive= this.size ==='big' ? 'yes' : 'no';
    return `${canDrive}, ${super.drive()}`;
  }
}

const toy=new Toycar('blue','big');
console.log(toy.drive());
```
es6 destructing
```javascript
class Car {
  constructor(a,b,c){
    Object.assign(this,{a,b,c});
    console.log('this',this); //Toycar{a:'a',b:'b',c:'c',d:'d'};
    console.log(new.target.name); //Toycar
  }
}

class Toycar extends Car {
  constructor(d,...args){
    super(...args);
    this.d=d;
  }
}


```
The '_proto_' is the Car, while the constructor is the Toycar
```javascript
const toy=new Toycar('d','a','b','c');
console.log(toy.__proto__); // Car {}
console.log(toy.constructor); // class Toycar extends Car {......} 
```
* static method -- class method
```javascript
class Car {
  constructor(color){
    this.color=color;
  }

  drive(){
    return 'driving';
  }
  

  //this method goes inside the class, not the prototype
  static comparePrice(){
    console.log('static');
  }
}

```
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/static-method.png" alt="staticmethod" width="350px" />

static methods as often used as utility methods
```javascript
class Car {
  constructor(color,price){
    this.color=color;
    this.price=price;
  }

  drive(){
    return 'driving';
  }  

  //this method goes inside the class, not the prototype
  static comparePrice(car1,car2){
    return car1.price-car2.price;
  }
}

const car1=new Car('red',1000);
const car2=new Car('blue',2000);

console.log(Car.comparePrice(car1,car2)); //-1000
```
* extends static method
```javascript
class Car {
  constructor(price){
    this.price=price;
  }

  //this method goes inside the class, not the prototype
  static comparePrice(car1,car2){
    return car1.price-car2.price;
  }
}

class Toycar extends Car {
  constructor(price){
    super(price);
  }
  static comparePrice(car1,car2){
    return `Toycar ${super.comparePrice(car1,car2)}`;
  }
}

const toy1=new Toycar(1000);
const toy2=new Toycar(2000);
console.log(Toycar.comparePrice(toy1,toy2)); //Toycar -1000
```
## decorator
```javascript
const lipstick=function(color){
    return function(target){
  	target.lips=color;
  };  
};

const earing=function(target){
  target.earing='diamond';
};


@lipstick('pink')
@earing
class Girl {

}

console.log(Girl.lips, Girl.earing); //pink diamond
```
### usage -- property decorator
```javascript
class Car {
  constructor(color){
    this.color=color;
  }
}

let decriptor={
  value: function(){
    return this.color;
  },
  writable: false,
  configurable: true,
  enumerable: true

};

const readonly=function(target,key, decriptor){
  decriptor.writable=false;
  return decriptor;
}

decriptor=readonly(Car.prototype,'getColor',decriptor);
Object.defineProperty(Car.prototype,'getColor',decriptor);

const redCar=new Car('red');

redCar.getColor=function(){
  return 're-write';
};

console.log(redCar.getColor()); //red, can be overwritten
```
* use decorator
```javascript
const readonly=function(target, key, decriptor){
  decriptor.writable=false;
  return decriptor;
}

class Car {
  constructor(color){
    this.color=color;
  }
  
  @readonly
  getColor(){
    return this.color;
  }
}

const redCar=new Car('red');
redCar.getColor=function(){
  return 're-write';
};
console.log(redCar.getColor()); //red
```


# Function

## closure
* lexical environment: everything outside can be accessed by everything inside

```javascript
passed=1
const addTo=function(){
  const inner=2;
  return passed+inner;
}
console.log(addTo()); //3
```


```javascript
const addTo=function(passed){
  const inner=function(inner){
    return passed+inner;
  };
  return inner;
}

addThree=addTo(3)
console.log(addThree); //[Function: inner]

console.log(addThree(1)); //4

```
## callback / higher order functions
functions are firsclass objects, pass functions as arguments into functions
```javascript
const x=function(){
  console.log('call back');
};

const y=function(callback){
  console.log('calling callback');
  callback();
}

y(x); //calling callback call back

```
usage

```javascript
const add=function(a,b){
  return a+b;
};

const calculate=function(n1,n2,calType){
  return calType(n1,n2);
};

console.log(calculate(1,2,add)); //3


//sort an array
const list=[
{num:1,name:'c'},
{num:2,name:'b'},
{num:3,name:'a'}];

list.sort(function(item1,item2){
  if(item1.num<item2.num){
    return -1;
  }else{
    return 1;
  }
});
console.log(list);
// [ { num: 1, name: 'c' },
//   { num: 2, name: 'b' },
//   { num: 3, name: 'a' } ]


list.sort(function(item1,item2){
  if(item1.name<item2.name){
    return -1;
  }else{
    return 1;
  }
});
console.log(list);
// [ { num: 3, name: 'a' },
//   { num: 2, name: 'b' },
//   { num: 1, name: 'c' } ]

```
## bind, call, apply

```javascript
const obj={num:2};

const addToThis=function(a,b){
  return this.num+a+b;
}

console.log(addToThis.call(obj,3,2)); //7

const list=[3,2]
console.log(addToThis.apply(obj,list)); //7

console.log(addToThis.bind(obj)); // [Function: bound addToThis]
console.log(addToThis.bind(obj)(3,2)) //7

```
usage
* borrow function from built-in 
```javascript
const argsToArray=function(){
  return [].slice.call(arguments);
};

console.log(argsToArray(1,2,3)); //[1,2,3]
//the same as
console.log([1,2,3].slice());

```
* inheritance

```javascript
let Mammal=function(legs){
  this.legs=legs;
};

Mammal.prototype={
  walk(){
    return 'walking';
  },

  sleep(){
    return 'sleeping'
  }
};

let Bat=function(legs,isVegetarian){
  Mammal.call(this,legs);
  this.isVegetarian=isVegetarian;
}

```
* methods that take array as arguments
```javascript
const list=[1,2,3];
console.log(Math.min.apply(null,list));
```
* bind method back
```javascript
const Button=function(content){
  this.content=content;
};

Button.prototype.click=function(){
  console.log(`${this.content} is clicked`);
};

const newButton= new Button('add');
newButton.click(); //add is clicked

const looseClick= newButton.click;
looseClick(); //undefined is clicked

const boundClick= newButton.click.bind(newButton);
boundClick(); //add is clicked
```
* function inside object methods
```javascript
const obj={
  asyncGet(cb){
    cb();
  },
  parse(){
    console.log('calling parse');
  },
  render(){
    this.asyncGet(function(){
      this.parse(); // if no binding, 'this' refers to the window
    }.bind(this)); //bind the 'obj' to 'this' inside the function
  }
};

obj.render(); //calling parse
```

## IIFE

```javascript
(function(i){
  return i+1;
})(j);

!function(){}();

//private methods
(function($){
  $(this).addClass('red');
})(window.jQuery);

```
a simple library
```javascript
const counter=(function(){
  let i=0;
  return {
    get: function(){return i},
    set: function(value){i=value},
    increment:function(){i++}
  };

})();

console.log(counter.get()); //0
counter.set(5);
console.log(counter.get()); //5
counter.increment();
console.log(counter.get()); //6
```
## currying -- use closure
```javascript
const add=function(a){
  return function(b){
    return a+b;
  }
};

const addToFive=add(5);
console.log(addToFive(1)); //6
```

```javascript
const avg=function(...args){
  let total=0;
  for (let i=0; i<args.length;i++){
    total+=args[i];
  }
  return total/args.length;
}

const spiceIp=function(fn,...args){
  return function(...nargs){
    return fn.apply(this,args.concat(nargs));
  };
};

const doAvg=spiceIp(avg,1,2,3);
console.log(doAvg(4,5,6)); //3.5

```

```javascript
const sayWhat=function(a){
  return function(b){
    return function(c){
      console.log("saying "+a+" to "+b+' with '+c);
    };
  };
};

sayWhat('hello')('Amy')('phone');

```
## function chaining
```javascript
const obj=function () {
  this.i=0;
  this.add=function (i) {
    this.i+=i;
    return this;
  };
  this.subtract=function (i) {
    this.i-=i;
    return this;
  };
  this.log=function(){
    console.log(this.i);
  }
}

const x= new obj();
x.add(2).subtract(1).log(); //1

```
with closure
```javascript
const obj=function () {
  i=0;
  const add=function (j) {
    i+=j;
    return this;
  };
  const subtract=function (j) {
    i-=j;
    return this;
  };
  const log=function(){
    console.log(i);
  }
  return {add:add,subtract:subtract,log:log};
}

const x= obj();
x.add(2).subtract(1).log(); //1

```
