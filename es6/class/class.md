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