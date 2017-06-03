> Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。       

参数：      
obj 对象  
prop 添加的属性  
descriptor 定义的属性描述

一般我们定义对象都是通过以下方式添加属性：
```
var data={
    name:"zhang",
    age:20
}
for(var i in data){
	console.log(i)
}
// name
// age
delete data.zhang; //true
```
采用这种方式添加的属性可以被删除，可以被遍历。而使用 Object.defineProperty() 则允许改变这些额外细节的默认设置。例如，默认情况下，使用  Object.defineProperty() 增加的属性值是不可改变的。

> 对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。数据描述符是一个拥有可写或不可写值的属性。存取描述符是由一对 getter-setter 函数功能来描述的属性。描述符必须是两种形式之一；不能同时是两者。

  
|属性|形式|说明|默认|
|:----:|:----:|:----:|:----:|
|configurable|数据描述符/存取描述符|当且仅当该属性的 configurable 为 true 时，该属性描述符才能够被改变，也能够被删除。|false|
|enumerable|数据描述符/存取描述符|当且仅当该属性的 enumerable 为 true 时，该属性才能够出现在对象的枚举属性中|false|
|value|数据描述符|该属性对应的值。|undefined|
|writable|数据描述符|当且仅当该属性的 writable 为 true 时，该属性才能被赋值运算符改变|false|
|get|存取描述符|一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。该方法返回值被用作属性值。|undefined|
|set|存取描述符|一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性|undefined|

简单示例：
```
var data = {};
Object.defineProperty(data,"name",{
	//什么都不写，查看默认值
})
//查看枚举
Object.keys(data);//[]空数组
//查看赋值操作
data.name = "12";
data.name;//undefined

//一起使用两种描述符
Object.defineProperty(data,"name",{
	value:"zh",
	get:function(){
		return 123;
	}
})
//提示错误，不能同时指定.。。。
//Invalid property descriptor. Cannot both specify accessors and a value or writable attribute

//设置存取描述符
var b;
Object.defineProperty(data,"name",{
	configurable:true,
	enumerable:true,
	get:function(){
		return b;
	},
	set:function(newValue){
		b=newValue;
	}
})
```

#### 修改属性
> 如果描述符的 configurable 特性为false（即该特性为non-configurable），那么除了 writable 外，其他特性都不能被修改，并且数据和存取描述符也不能相互切换。

如果一个属性的 configurable 为 false，则其 writable 特性也只能修改为 false。

可以试一下：
```
var data = {}
Object.defineProperty(data,"name",{
    //configurable默认为false
})
//尝试修改其他属性，定义值
Object.defineProperty(data,"name",{
	writable:true,
	value:"12"
})
//Cannot redefine property: name无法重新定义name
```

#### 添加多个属性和默认值
```
var o = {};

o.a = 1;
// 等同于 :
Object.defineProperty(o, "a", {
  value : 1,
  writable : true,
  configurable : true,
  enumerable : true
});
```

#### Setters 和 Getters
