## 定义类
“类”是一个特殊的函数，就像你能够定义的函数表达式和函数声明一样，类语法有两个组成部分：类表达式和类声明。
### 类声明
定义一个类的方法是使用一个类声明。声明一个类，可以使用带有class关键字的类名。
```
class Rectangle {
    contructor(height,width) {
        this.height = height;
        this.width = width;
    }
}
```
+ 提升
函数声明和类声明的一个重要区别是函数声明会声明提升，类声明不会。首先需要声明类，然后访问，否则会报错。
```
let p = new Rectangle();
//Uncaught ReferenceError 引用错误

class Rectangle {}
```
函数声明和构造函数定义类只要有其中一个声明了，另外一个定义就会报声明已经存在。
```
class Rectangle {
    constructor (height,width){
        this.height = height;
        this.width = width;
    }
}

function Rectangle(height,width){
    this.height = height;
    this.width = width;
}
//Identifier 'Rectangle' has already been declared
```
### 类表达式
一个类表达式是定义一个类的另一种方式。类表达式可以是被命名的或匿名的。
+ 匿名类
```
let Rec = class {
    constructor(height,width) {
        this.height = height;
        this.width = width;
    }
}
```
+ 命名的类
```
let Rec = class Rec {
    constructor(height,width) {
        this.height = height;
        this.width = width;
    }
}
```
ES6的类完全可以看做是构造函数的另一种写法。
```
//我们知道原型的constructor属性执行构造函数
class Point{
    //...
}
typeof Point // "function"
Point === Point.prototype.constructor //true
```
类的使用：与构造函数类似，也是直接使用new命令
```
class Bar {
    doStuff(){
        console.log("stuff");	
    }	
}
var b = new Bar();
b.doStuff();//stuff
```
构造函数的配`prototype`属性在ES6 的类继续存在。类的所有方法都定义在类的prototype属性上。
```
class Point {
    constructor(){

    }
    toString(){

    }
}
//等同于
Point.prototype = {
    constructor() {},
    toString() {}
};
```
在类的实例上调用方法，其实就是调用原型上的方法。
由于类的方法都定义在`prototype`对象上面，所以类的新方法可以添加在prototype对象上面。`Object.assign`方法可以很方便的一次向类添加多个方法。
```
class Animal {
    constructor(){}
}
Object.assign(Animal.prototype,{
    sayName(){console.log('432');}
})
let an = new Animal();
an//查看实例

an.sayName();      //432
```
另外，类的内部所有定义的方法，都是不可枚举的。这点与ES5是不一样的。
```
//类定义
class Per{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    area(){
        return this.x * this.y;
    }
}
Object.keys(Per.prototype) //[]
Object.getOwnPropertyNames(Per.prototype) // ["constructor","area"]

//构造函数定义
var Abc = function(x,y){

}
Abc.prototype.sayName = function(){

}
Object.keys(Abc.prototype) //["sayName"]
Object.getOwnPropertyNames(Abc.prototype)//["constructor","sayName"]
```
类和模块的内部，默认就是严格模式，所以不需要使用`use strict`指定运行模式。
### constructor方法
`constructor`方法是类的默认方法，通过`new`命令生成对象实例时，自动调用该方法。一个类必须有`constructor`方法，如果没有显示定义，一个空的`constructor`方法会被默认添加。
```
class Point {
}

// 等同于
class Point {
  constructor() {}
}
```
`constructor`方法默认返回实例对象（`this`），我们指定返回另一个对象时：
```
class Foo{
    constructor(){
        return Object.create(null)
    }	
}
var a= new Foo();
a.constructor === Foo.prototype.constructor //false

//上面代码中，constructor函数返回一个全新的对象，
//结果导致实例对象不是Foo类的实例。
```
类必须使用`new`调用，否则会报错，这点跟普通构造函数不一致，普通构造函数不用new也可以执行。

### 类的实例对象
生成类的实例对象，与ES5一样，使用`new`命令。
与ES5一样，实例属性除非显式定义在其本身（即定义在`this`对象上），否则都是定义在原型上。
```
//定义类
class Point {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
    toString(){
        return '('+this.x+','+this.y+')';
    }
}

var point = new Point(2, 3);

point.toString() // (2, 3)

point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true
```
与ES5一样，类的所有实例共享一个原型对象。
```
var p1 = new Point(1,2);
var p2 = new Point(2,3);

p1.__proto__ === p2.__proto__      //true
```
p1和p2都是`Point`的实例，原型都是`Point.prototype`，所以`__proto__`属性是相等的。
这意味着，可以通过实例的`__proto__`属性为类添加方法。
```
var point = new Point(1,2);
point.__proto__.printName = function() {return "point"}

point.printName();  //'point'

var p1 = new Point(2,3);
p1.printName();  //'point'
```
使用实例的`__proto__`属性改写原型，必须相当谨慎，不推荐使用，因为这会改变类的原型，影响所有的实例。
### this的指向
类的方法内部如果含有this，它默认指向类的实例。但是，如果将这个方法提取出来单独使用，`this`会指向该方法运行时所在的环境，很可能会报错。
```
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
```
上面代码中，`printName`方法放在全局调用，`this`指向`window`，这个环境没有对应的`print`函数，`print`是实例的方法，`this`指向这个实例才可以调用它。   

所以不报错的解决方案就是如何改变函数中`this`的指向。
在JavaScript中，call、apply和bind是Function对象自带的三个方法，这三个方法的主要作用是改变函数中的this指向。他们三个的第一个参数都是this要指向的对象。  

区别：bind 是返回对应函数，bind方法的返回值是函数，便于稍后调用；apply 、call 则是立即调用。
```
printName.call(logger) //Hello there

printName.apply(logger) //Hello there

printName.bind(logger)() //Hello there
```
另一种解决方法是使用箭头函数。   
箭头函数：函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
```
class Logger {
  constructor() {
    this.printName = (name = 'there') => {
      this.print(`Hello ${name}`);
    };
  }

  // ...
}
```
由于本质上，ES6的类只是ES5的构造函数的一层封装，所以函数的许多特性都被`Class`继承，包括`name`属性。
```
class Point {}
Point.name // "Point"
```
`name`属性总是返回紧跟在`class`关键字后面的类名。
### Class的取值函数（getter）和存值函数（setter）
与ES5一样，在类的内部可以使用`get`和`set`关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。
```
class MyClass {
  constructor() {}
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123; // setter: 123

inst.prop  // 'getter'
```
存值函数和取值函数是设置在Descriptor对象上的。
与ES5一样，使用`Object.getOwnPropertyDescriptor()`方法，可以取得给定属性的描述符，参数：属性所在的对象、要读取描述符的名称。返回值是一个对象，如果是访问器属性，这个对象的属性有：`configuable`、`enumerable`、`get`、`set`，如果是数据属性，这个对象的属性有：`configuable`、`enumerable`、`writable`、`value`
```
class Cus {
    constructor(ele) {
        this.element = ele;
    }

    get html() {
        return this.element.innerHTML;
    }

    set html(value) {
        this.element.innerHTML = value;
    }
}

var desc = Object.getOwnPropertyDescriptor(Cus.prototype,"html");
```
### class的静态方法
类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上`static`关键字，就表示该方法不会被实例继承，而是直接通过类来调用，称为“静态方法”。
```
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
```
注意：如果静态方法包含`this`关键字，这个`this`指的是类，而不是实例。
```
class Foo {
  static bar () {
    this.baz();
  }
  static baz () {
    console.log('hello');
  }
  baz () {
    console.log('world');
  }
}

Foo.bar() // hello
```
静态方法内部`this.baz()`等同于调用`Foo.baz()`。因此，可以看出，静态方法可以和非静态方法重名。父类的静态方法，可以被子类继承。
### class的静态属性和实例属性  
静态属性指的是Class本身的属性，而不是定义在实例对象`this`上的属性。
定义类的静态属性，通过类的对象`.`去添加，不可以通过`static`，Class内部只有静态方法，没有静态属性。
```
// 以下两种写法都无效
class Foo {
  // 写法一
  prop: 2

  // 写法二
  static prop: 2
}

Foo.prop // undefined
```
### new.target 属性
`new`是从构造函数生成实例的命令。ES6为`new`命令引入了一个`new.target`属性，该属性一般用在构造函数中，返回`new`命令作用于的那个构造函数。如果构造函数不是通过new命令调用的，`new.target`会返回`undefined`，因此这个属性可以用来确定构造函数是怎么调用的。
```
function Person(){
    console.log(new.target);
}
Person() //undefined

var person = new Person();

/*ƒ Person(){
    console.log(new.target);
}*/
```
Class 内部调用new.target，返回当前 Class。

注意：子类继承父类时，`new.target`会返回子类。

利用这个特点，可以写出不能独立使用、必须继承才能使用的类。
```
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}

var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确
```
注意，在函数外部，使用`new.target`会报错。