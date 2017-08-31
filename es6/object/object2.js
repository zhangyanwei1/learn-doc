//属性名表达式

//js定义对象的属性
var obj = {};
obj.foo = true;//1 直接定义
obj["a"+"bc"] = 123;//2 使用表达式

//3 字面量方式
var obj1 = {
    foo: true,
    abc: 123,
}

//es6允许使用字面量表达式时可以使用  []加表达式
let prop = 'fob';

let obj2 = {
  [prop]: true,
  ['a' + 'bc']: 123
};
console.log(obj1);

//表达式也可以用于定义方法名
let obj3 = {
    ["hell"+"o"](){
        return "hi";
    }
}
obj3.hello();

//属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]
const keyA = {a: 1};
const obj4 = {
    [keyA]: "AAAA"
}
console.log(obj4);  //{ '[object Object]': 'AAAA' }