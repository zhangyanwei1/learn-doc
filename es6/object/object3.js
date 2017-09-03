//Object.assign()方法用于对象的合并，将源对象的所有可枚举属性，复制到目标对象。
//源source 目标target
//Object.assign(target,source,source);
var target = {a: 1};

var source1 = {b: 2};
var source2 = {c: 3};

Object.assign(target,source1,source2);
console.log(target); // {a:1, b:2, c:3}

//Object.assign方法的第一个目标是目标参数，后面的参数都是源对象
///如果：目标对象与源对象有同名属性，或者多个源对象有同名属性，则后面的属性会覆盖前面的属性。

var source3 = {c:4};
Object.assign(target,source1,source2,source3);
console.log(target); // {a:1, b:2, c:4}

//如果只有一个参数，Object.assign会返回该参数
//如果该参数不是对象，会转换成对象再返回，不能转成对象的就会报错、
console.log(Object.assign(2));
Object.assign(undefined) // 报错
Object.assign(null) // 报错

//但是，若他们不出现在target参数位置，就不会报错。
let obj = {a:1};
Object.assign(obj,undefined) === obj //true

/**
 * Object.assign方法实行的是浅拷贝，而不是深拷贝。
 * 也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。
 */