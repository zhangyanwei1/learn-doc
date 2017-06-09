自己在写代码时对this的指向总是靠猜的，这里整理一下。  

this是什么？  
> this是js函数的内置参数，每创建一个js函数都会自动生成this参数。与之同时产生的内置参数还有arguments。

this有什么用处？   
> this用于在js函数调用时指明函数调用上下文，建立函数内部与调用上下文之间的联系。此处尤其需要注意的是，只有当函数调用时，this建立的上下文联系才存在；仅仅定义函数而不调用，this所建立的上下文联系并不存在。并且这种上下文联系的类型，决定于函数调用的方式。

### 函数调用方式
+ 方法调用模式
+ 函数调用模式
+ 构造器调用模式
+ apply/calld调用模式

#### 方法调用模式
函数被定义为对象的方法时，以对象的方法形式调用该函数。
```
var o = {
    init:function(){
	    console.log(this);
    }
}
o.init();//o
```

#### 函数调用模式
当一个函数不是一个对象的属性时，就是被当做一个函数来调用的。此时this被绑定到全局对象。
```
//全局函数
function fuc(){
    console.log(this);
}
func();//window

var value = "window";
var obj = {
    value:"obj",
    init:function(){
        function foo(){
            console.log(this.value);
        }
        foo();
    }
}
obj.init();//window

//在对象中定义的函数，如果想访问这个对象的变量，可以通过将this的引用复制一份，然后通过这个变量来访问我们想要的。
var value = "window";
var obj = {
    value:"obj",
    init:function(){
        var _this = this;
        function foo(){
            console.log(_this.value);
        }
        foo();
    }
}
obj.init();//obj

//一种简单的方式区分是方法调用还是函数调用，方法调用是通过 "." 去调用
//函数调用是函数名后面跟() 去调用
```

#### 构造器调用模式
这里首先分析一下new一个构造函数的过程。
第一步：创建一个新对象   
第二步：将构造函数的作用域赋给新对象，因此this就指向了这个新对象  
第三步：执行构造函数代码，为这个新对象添加属性和方法  
第四步：返回新对象
```
function Person(){
    this.name = "zhangyanwei";
    this.sayName();
}
Person.prototype.sayName = function(){
    this.age = 22;
    console.log(this.name+this.age);
}
function (){
    this.age = 22;
    console.log(this.name+this.age);
}
var person = new Person();//zhangyanwei22
person.hasOwnProperty("age");//true
```

#### 显示的改变this指向模式
apply（call）方法允许我们构建一个参数数组传递给调用函数，也允许我们选择this的值。它接受两个参数，第一个是要绑定给this的值，第二个是一个参数数组。
```
function Parent(name){
    this.name = name;
}

function Child(age){
    Parent.call(this,"zhang");
    this.age = age;
}

Child.prototype = new Parent();
var child = new Child();
child.hasOwnProperty("name");//true
```