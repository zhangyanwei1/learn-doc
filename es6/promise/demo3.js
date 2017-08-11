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