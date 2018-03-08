
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

console.log(toyCarWood.__proto__); //{log: ƒ}
console.log(ToyCarWood.__proto__); //ƒ () { [native code] }
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
}
<img src="https://github.com/zhaaaa7/javascript/blob/master/img/es6class.png" alt="es6class" width="350px"/>
console.log(typeof Car); //function
```

```javascript
```

```javascript
```

```javascript
```

```javascript
```

```javascript
```

```javascript
```

```javascript
```

```javascript
```

```javascript
```

```javascript
```
