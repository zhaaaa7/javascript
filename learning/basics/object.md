
# Object
## overview
1. an example
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
2. properties are all public 

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

3. getter ans setter
```javascript

let CarPrivate=function(_color){
  this.setColor=function(color){
    _color:color;
  }
  this.getColor=function(){
    return _color;
  } 
};
let yellowCar=new CarPrivate('yellow');
console.log(yellowCar.getColor());  //yellow
```

## Create an object
1. factory pattern
```javascript

var peopleFactory=function(age,name){
  var temp={};
  temp.age=age;
  temp.name=name;

  temp.printPerson=function(){
    console.log(this.name+' is '+this.age);
  };

  return temp;
};

var person1=peopleFactory(1,'julie1');
person1.printPerson();
```

2. constructor pattern
```javascript
var peopleConstructor=function(age,name){
	this.name=name;
	this.age=age;

	this.printPerson=function(){
    	console.log(this.name+' is '+this.age);
  	};
  	//no return
};

var person2 = new peopleConstructor(2,'julie2');
person2.printPerson();
```
3. prototype pattern
```javascript
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
person3.printPerson(); //default name is 3
```
4. dynamic prototype pattern
```javascript

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
person4.printPerson();  //julie is 4
console.log(person4.hasOwnProperty('name')); //true
```
## Inheritance
```javascript
//base class object
var Job=function(){
  this.pays=true;
  this.name="inside job"
};
Job.prototype.log=function(){
  console.log(this.name, this.pays?'I\'ll take this job':'No.');
};

//sub-class object
var TechJob=function(title,pays){
  //1.inherit from the Job constructor
  Job.call(this);
  this.pays=pays; //overwritting
  this.title=title;
}
//2.inherit from Job prototype
TechJob.prototype=Object.create(Job.prototype);
//3.set the constructor in prototype back to TechJob
TechJob.prototype.constructor=TechJob;

var developer=new TechJob('js',false);
developer.log();  // inside job, no
```
## Constructor
1. object instance has no `constructor` property, but it can access to it because it is on `Object.prototype`. It is actually Object.prototype.constructor.

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
  __proto__:{
    contructor:f(color),
    _proto_:Object
  }
}

redCar.constructor ==> f Car();

```

## how does `new` work
```javascript
//without new, 'this' refers to the window object
//to locate the error of missing 'new'
let CarNew=function(color){
  if(!new.target) throw 'Car() must be called with new';
  this.color=color;
};

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
## .call
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
## Object literal 'inheritance'
1. Object.setPrototypeOf() -- set up the prototype link
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

2. Object.assign -- copy the method, causing overwriting

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
```
 a more concise constructor
```javascript

let c1=function (x,y,z) {
  this.x=x;
  this.y=y;
  this.z=z;
}

let c1=function (x,y,z) {
  Object.assign(this,{x,y,z});
}
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

## methods
1. Object.values => returns an array
```js
const INGREDIENT_PRICES = {
salad: 0.5,
cheese: 0.4,
meat: 1.3,
bacon: 0.7
};

console.log(Object.values(INGREDIENT_PRICES)); //[0.5, 0.4, 1.3, 0.7]
```


2. get() set()
```js
const obj1 = {
	_key1: 1,
	get key() {
	    return this._key1;
	},
	set key(value) {
	    this._key1 = value;
	}
};

console.log(obj1.key); //1
obj1.key = 2;
console.log(obj1.key); //2
```
