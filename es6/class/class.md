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
### 类体和方法定义
一个类的类体是一堆花括号中的部分。这是我们定义类成员的位置，如方法或构造函数。

### 构造函数
构造函数是一个特殊的方法，用于创建和初始化一个类。一个类只能拥有一个名为"contrustructor"的特殊方法。
一个构造函数可以使用super关键字来调用父类的构造函数的属性以及方法。
### 原型方法
