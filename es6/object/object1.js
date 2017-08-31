//属性的简洁表示法
//直接写入变量和对应的值，作为对象的属性和方法
var name = "zhangyanwei";
var sayName = function() {
    console.log(this.name);
}
var obj = {name,sayName}
obj.sayName();
//zhangyanwei

//方法也可以简写
var birth = "1994/11/05";

var Person = {
    name: "zhangyanwei",
    birth,
    hello() {
        console.log("my name is:"+this.name)
    }
}
Person.hello();
//my name is:zhangyanwei


//特别对于模块想要暴露一组变量，使用这种写法
var ms = {};

function getItem (key) {
    return key in ms ? ms[key] : null;
}

function setItem (key, value) {
    ms[key] = value;
}

function clear () {
    ms = {};
}

module.exports = {getItem, setItem, clear};

// 等同于
module.exports = {
  getItem: getItem,
  setItem: setItem,
  clear: clear
};