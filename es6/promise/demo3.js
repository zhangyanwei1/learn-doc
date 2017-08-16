var p1 = new Promise(function(resolve,reject) {
    setTimeout(
        () => resolve("success"),
    3000)
});

var p2 = new Promise(function(resolve,reject){
    setTimeout(
        () => resolve(p1),
        1000)
})

p1.then(
    result => console.log(result)
)

p2.then(
    result => console.log(result)
).catch(
    error => console.log(error)
)

/**
 * resolve函数的参数除了正常的值以外，还可能是另一个Promise实例。
 * 上面代码中，p1、p2都是Promise的实例，但是p2的resolve方法将p1作为参数，即一个异步操作的结果是返回另一个异步操作。
 * 
 * 这时：p1的状态会传递给p2，p2自己的状态就不管用了，由p1决定，如果p1的状态时pending，那么p2的回调函数就会等待p1的状态改变；
 * 如果p1的状态已经是Resolved或者Rejected，那么p2的回调函数就会立即执行。
 */

/**
 * 调用resolve或者reject并不会终结Promise的参数函数的执行。
 */
new Promise((resolve,reject) => {
    resolve(1);
    console.log(2);
}).then((r) => {
    console.log(r);
});
//2
//1

/**
 * 立即Resolved的promise是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。
 * 一般来说，调用resolve或者reject后，Promise的使命就完成了，后续操作应该放在then方法里面，而不应该直接写在resolve或reject的后面。
 * 所以，最好在他们之前加上return语句，这样就不会有意外。
 */
new Promise((resolve,reject) => {
    return resolve(1);
    //后面的语句不会执行
    console.log(2);
})