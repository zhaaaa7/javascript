## Why class:
To share data and methods between objects.

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
the same as in es5
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
## inheritance

The subclass inherits all of the parent's getters, setters, and methods. You can also use the super keyword to set properties in the parent class. Each instance of a class has the same properties, getters, setters, and methods. Only the property values change.

* super keyword

The super keyword is used in subclasses to call a parent constructor(). super accepts arguments for the parent constructor()'s parameters. If you use this before super, JavaScript will throw an error.

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
can use es6 destructing
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

##  class is not a native object type, just a key word.-- syntax sugar
```javascript
const toy=new Toycar('d','a','b','c');

console.log(toy.__proto__); // Toycar {}
console.log(toy.constructor); // f Toycar
```

## static method -- class method

They are made directly on the class and are not callable on instances of the class. 

```javascript
class Car {
  constructor(color){
    this.color=color;
  }

  drive(){
    return 'driving';
  }
  

  //this method goes onto the function itself, not the prototype
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


## prototype chain
```js
class Animal {
    constructor() {
        this.name = 'lal';
    }
}


class Dog extends Animal {

}

console.log(Animal.__proto__); // Function.prototype
console.log(Animal.prototype); // {constructor: class Animal}
console.log(Dog.__proto__);  // class Animal {constructor() {this.name = 'lal';}}
console.log(Dog.prototype);  // {constructor: class Dog}

const puppy = new Dog();
console.log(puppy.__proto__); // {constructor: class Dog} === Dog.prototype

Dog.prototype.__proto__===Animal.prototype //true
```
