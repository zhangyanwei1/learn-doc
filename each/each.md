# each 源码分析

jQuery V3.2.1

each是jQuery对象原型上的方法   
用于遍历一个数组或对象,并对当前遍历的元素进行处理 

```
each: function( callback ) {
    return jQuery.each( this, callback );
},
```
each函数通过jQuery.extendh函数t添加到jQuery对象
```
jQuery.extend({
    each:function(){

    }
})
```
each函数源码
```
each: function( obj, callback ) {

    //遍历的长度和初始值定义
	var length, i = 0;

    /**
    * each遍历两种类型
    * 第一种是类数组的对象
    * 第二种是对象
    * 根据是遍历类型判断采取哪种方式
    * 数组就用一般的for循环
    * 对象用for in循环
    */

    //检测类数组
	if ( isArrayLike( obj ) ) {
		length = obj.length;
		for ( ; i < length; i++ ) {
			if ( callback.call( obj[ i ], i, obj[ i ] ) === false ){
				break;
			}
		}
	} else {
		for ( i in obj ) {
			if ( callback.call( obj[ i ], i, obj[ i ] ) === false ){
				break;
			}
		}
	}
    /**
    * call() 方法在使用一个指定的this值和若干个指定的参数值的前提下调用某个函数或方法.
    * 针对每一项将当前对象作为this 
    * 指定参数  i：当前的一个索引值，从0开始计算。obj[ i ]：当前对象
    * call函数改变了this指向 this与当前item相等

    var a=[1,2];
    $.each(a,function(i,item){
	    console.log(this==item)
    })
    输出两个true

    * 调用each不用显示指定callback第二个参数
    */

    //调用each方法后返回遍历的对象
	return obj;
}
//类数组检测
function isArrayLike( obj ) {

	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );
        //type可以准确检测数据类型，包括引用类型，返回类型字符串
    
    /**
    * 类数组：
    * json对象具有"length"属性
    * js对象具有length属性      并且是数字
    * 或者类型是数组
    */
	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
```

### call()方法
call()是Function原型的方法。

+ 语法    
` fun.call(thisArg[, arg1[, arg2[, ...]]]) `
+ 参数    
this
在fun函数运行时指定的this值。arg1, arg2, ...指定的参数列表。

each方法中：

将callback方法放到obj[i]上使用,后面的作为参数传入。
```
var obj={
            "name":"zhang",
            "age":18,
            "phone":"188894347"
        }
    $.each(obj,function(index,item){
            console.log(index+":"+item);
    })
    /**
    * 每次遍历都是用回调函数的方式来执行操作，参数是call方法指定的
    */
```
一个非常简单的例子，测试this
```
var name="window";
function printName(){
	console.log(this.name);
}
//运行printName()
printName()
//window

//定义一个对象
var obj={
    "name":"zhangyanwei"
}

//再次执行printName()
printName()
//zhangyanwei
```