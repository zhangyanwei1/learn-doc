/**
 * Promise构造函数接受一个函数作为参数，该函数有两个参数；
 * 函数作用：将Promise对象的状态从“未完成”变成“成功”或者“失败”，并在相应的状态发生时调用，将异步操作的结果，作为参数传递出去。
 */
var promise = new Promise(function(resolve,reject){
    if(/* 异步操作成功 */){
        resolve(value);
    }else {
        reject(error);
    }
})

/**
 * Promise实例生成后，可以用then方法分别指定Resolved状态和Rejected状态的回调函数。
 */
promise.then(function(value) {
    //success
}, function(error) {
    //failure
})
/**
 * then方法可以接收两个回调函数作为参数。
 * 第一个回调函数时Promise对象的状态变为Resolved时调用，第二个回调函数是Promise对象的状态变为Rejected时调用。
 * 第二个参数可选，这个两个对象都接收Promise对象传出的值作为参数。
 */

//Promise新建后会立即执行