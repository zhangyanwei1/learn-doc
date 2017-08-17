/**
 * Promise.resolve方法：将现有对象转为Promise对象。
 */
Promise.resolve('foo').then(r => {
    console.log(r);
})
//foo
//等价于
new Promise(resolve => resolve('foo')).then(r => {
    console.log(r);
})
//foo
/**
 * Promise.resolve方法的参数:
 */
//（1）如果参数是Promise实例，那么Promise.resolve将不做任何的修改、原封不动的返回这个实例。
//（2）参数是是具有then方法的对象，比如：
let thenable = {
    then: function(resolve,reject) {
        resolve(42);
    }
};
let p1 = Promise.resolve(thenable);
p1.then(function (value) {
    console.log(value);
})
//42
//上面代码中，thenable方法执行后，对象p1的状态变为resolved，然后将立即执行p1对应的then方法，输出42

//（3）参数不具有then方法的对象，或者不是对象
var p = Promise.resolve("hello");
p.then(r => {
    console.log(r);
})
//hello
//上面代码生成一个新的Promise对象的实例p。由于字符串不属于异步操作，返回Promise实例的状态从一生成就是resolved，所以回调函数会立即执行。
//Promise.resolve方法的参数，会同时传递给回调函数。

//（4）Promise.resolve方法允许调用时不带参数，直接返回一个Resolved状态的Promise对象。

//注意:立即resolve的Promise对象，是在本轮“事件循环”的结束时，而不是下一轮事件循环开始时
setTimeout(function () {
    console.log('three');
},0);

Promise.resolve().then(function () {
    console.log('two');
});

console.log('one');
//执行整个js

//one
//foo
//foo
//hello
//two
//42
//three

//setTimeout(fn, 0)在下一轮“事件循环”开始时执行，Promise.resolve()在本轮“事件循环”结束时执行，console.log('one')则是立即执行，因此最先输出。