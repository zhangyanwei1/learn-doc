## 函数参数
```
function sayHi(name,message){
    console.log("hello:"+name+','+message)
}
sayHi('zhangyanwei',"good morning")//hello:zhangyanwei,good morning

function sayHi(){
    console.log("hello:"+arguments[0]+','+arguments[1])
}
sayHi('zhangyanwei',"good morning")//hello:zhangyanwei,good morning
```
ECMAscript函数不介意传递的参数个数与类型，函数接受一个参数数组，在函数内通过arguments对象来访问这个参数数组，可以获取到传递给函数的每一个参数。

arguments对象与数组类似，可以通过方括号来访问他的每一个元素，用length来确定参数个数。也就是说，命名的参数不是必须定义的。

开发者可以根据函数参数个数实现适当的功能：
```
function doAdd(){
    if(arguments.length === 1){
        console.log(arguments[0]+10)
    }else if(arguments.length === 2){
        console.log(arguments[0]+arguments[1]);
    }
}
doAdd(1,2)//3
doAdd(1)//11
```
arguments对象可以和命名参数一起使用。arguments对象对应的下标值与对应命名参数的值永远保持同步。
```
function doAdd(num0,num1){
    arguments[1] = 10;
    console.log(num0+num1);
}
doAdd(10,1)//20
```
没有传递值的命名参数将被赋予undefined。
### 没有重载
ECMAScript函数不能实现重载，传统的语言重载只要编写两个定义（接受的参数的类型和数量不同即可）。JavaScript参数是由多个值的数组组成，没有函数签名，不能实现重载。   

在JavaScript中定义两个相同名字的函数，这个名字的函数会执行后定义的函数。
```
function addSome(num){
    console.log(num+100);
}
function addSome(num){
    console.log(num+200);
}
addSome(100)//300
```