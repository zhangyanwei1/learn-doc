### jQuery.extend([deep],target,obj1,objN)
描述：将两个或多个对象合并为一个对象   
+ deep 深拷贝   
可选参数，为true或false。默认情况是false（浅拷贝），并且false是不能够显示的写出来的。如果想写，只能写true（深拷贝）

+ target 目标对象，扩展的对象，它将收到新的属性

+ obj1 对象，包含要合并的其他属性的对象

当提供两个或多个对象参数时，所有对象的属性都将添加到目标对象中。 

如果只提供一个参数，则表示目标参数被省略，这种情况下，jQuery对象本身被假定为目标。通过这种方式可以向jQuery命名空间添加新功能。对于想向jQuery添加新方法的插件作者比较有用。

记住，目标对象会被修改并且返回，如果想保留原始对象，可以传一个空对象作为目标对象。
`var object = $.extend({}, object1, object2);`   

$.extend() 默认情况下，执行的合并是浅拷贝。如果第一个对象的属性本身是对象或数组，则它将被第二个或后续对象中具有相同键的属性完全覆盖。

第一个参数为true时，执行的是深拷贝，如果第一个对象的属性第二个对象也有，它将继续比较这个属性内部是否还有不一样的属性，如果有不一样的，不是直接覆盖，而是会内部再次合并。

示例：
```
var object1 = {
  apple: 0,
  banana: { weight: 52, price: 100 },
  cherry: 97
};
var object2 = {
  banana: { price: 200 },
  durian: 100
};
//false默认
$.extend({},object1,object2);
//true深拷贝
$.extend(true,{},object1,object2)

//不一样：banner，第一种情况，object2的相同属性直接覆盖了第一个。
//深拷贝时，banner将递归再次合并。
```
### 源码学习
```
jQuery.extend = jQuery.fn.extand = function(){

}
```