# JavaScript复制变量值和传递参数
JavaScript变量值有基本类型和引用类型两种

### 基本类型复制变量值 
```
var num1 = 5;
var num2 = num1;
num1 = 2;            //改变num1
console.log(num2);    //5,num2的值不会随num1改变而改变
```
基本类型的复制是将其中一个副本复制给另一个变量，这两个变量可以参加任何操作而不相互影响。    
复制基本类型的过程：    

![](http://img.blog.csdn.net/20160913105424988)

### 引用类型复制变量值
```
var obj1 = new Object();
var obj2 = obj1;
obj1 === obj2;   //true obj1和obj2的引用都执行一个Object
obj1.name = "zhang";
console.log(obj2.name);  //"zhang"
```
从一个对象向另一个对象复制引用类型的值时，也会复制一个值的副本，这个副本是一个指针，指向存在堆内存中的一个对象，复制结束后，两个变量都指向同一个对象。因此改变其中一个变量就会影响另一个。    
注意：如果改变其中一个的指向后，两个变量的指向就不是同一个了。
```
var obj1 = new Object();
var obj2 = obj1;//这时指向相同
obj2 = {};
obj1 === obj2; //false  obj2的指向改变，obj1还是指向原来的。
```
引用类型复制的过程：
![](http://img.blog.csdn.net/20160913111944546)

## 传递参数
```
function changeStuff(num, obj1, obj2)
{
    num = num * 10;
    obj1.item = "changed";
    obj2 = {item: "changed"};
}

var num = 10;
var obj1 = {item: "unchanged"};
var obj2 = {item: "unchanged"};
changeStuff(num, obj1, obj2);
console.log(num);   // 10
console.log(obj1.item);    // changed
console.log(obj2.item);    // unchanged
```
我自己在理解时不去管按值传递还是按引用传递，我就按前面讲的值的复制理解。    

将num作为参数传递，将num复制给参数变量，这是复制的是基本类型，虽然名字取得一样，这两个并不是同一个变量。基本类型的复制相互不会受影响，所以函数内部怎么修改参数的值都不会对外面num的值进行改变。

另外两个参数是复制的引用类型，引用类型的两个变量将指向堆内存的同一个对象。例子中演示了两种情况，其中一种是改变了对象中的某一个属性值，然后另一个变量的指向的是同一个对象，当然对象属性也改变了。  
另一种情况是在函数中将一个变量的值指向了堆内存中一个新的对象，外面的变量指向的对象没有发生改变，当然对象的属性也没有发生改变。

### 推荐链接
[传值还是传引用](https://github.com/simongong/js-stackoverflow-highest-votes/blob/master/questions21-30/parameter-passed-by-value-or-reference.md)   
更细的一个：   
[Is JavaScript a pass-by-reference or pass-by-value language?](https://stackoverflow.com/questions/518000/is-javascript-a-pass-by-reference-or-pass-by-value-language)