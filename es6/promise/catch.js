//示例
var promise = new Promise(function(resolve,reject){
    throw new Error("test");
})
promise.catch(function(error){
    console.log(error);
});
//promise抛出一个错误，被catch方法指定的回调函数捕获。等同于：

var promise = new Promise(function(resolve,reject){
    try {
        throw new Error("test");
    } catch(e) {
        reject(e);
    }
});
promise.catch(function(error){
    console.log(error);
    console.log("错误打印");  //catch会捕获错误，因而错误不会阻断程序的执行。
});

//第二种等同写法：
var promise = new Promise(function(resolve,reject){
    reject(new Error("Test"));
});
promise.catch(function(error){
    console.log(error);
});

//比较发现，reject方法的作用等同于抛出错误
//如果Promise状态已经变成Resolved，在抛出错误是无效的。
var promise = new Promise(function(resolve,reject){
    resolve("OK");
    throw new Error("test");//在Promise状态变为成功后，状态就定了，不会变为失败状态了。
});
promise.then(
    value => console.log(value)
).catch(
    error => console.log(error)
)
//OK
//Promise 在resolve语句后面，再抛出错误，不会被捕获，等于没有抛出。
//因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了。

/**
 * Promise对象的错误具有冒泡性质，会一直向外传递，直到捕获为止。也就是说，错误总是会被下一个catch语句捕获。
 */
getJSON('/post/1.json').then(function(post){
    return getJSON(post.commentURI);
}).then(function(comments) {
  // some code
}).catch(function(error) {
  // 处理前面三个Promise产生的错误
});

//一般来说，不要在then方法里面定义Reject状态的回调函数（then的第二个参数），建议使用catch方法。
promise.then(function(data){

    }).catch(function(err){

    });
//理由是第二种写法可以捕获前面then方法执行中的错误，也更接近同步的写法（try/catch）。所以，建议总是使用catch方法，而不是用then的第二个参数。

var promise = new Promise(function (resolve, reject) {
  resolve('ok');
  setTimeout(function () { throw new Error('test') }, 0)
  //setTimeout(function () { console.log("下一个事件轮询") }, 0)
  //setTimeout(function () { resolve('ok'); }, 0)
});
promise.then(function (value) { console.log(value) })
    .catch(function(err){
        console.log(err);
        console.log("捕获到了错误");
    });
/**
 * Promise 指定在下一轮“事件循环”再抛出错误。到了那个时候，Promise 的运行已经结束了，
 * 所以这个错误是在 Promise 函数体外抛出的，会冒泡到最外层，成了未捕获的错误。
 * 
 * setTimeout是在下一个事件轮询里的，如果为抛出错误，是先执行Resolve状态方法，然后执行下一事件轮询。
 * 如果当前Promise状态为变为Resolved，一直是pending，然后在setTimeout里执行Resolved，这样也可以改变Promise的状态。
 */

//注意：catch方法返回的还是一个promise对象，因此后面还可以接着调用then方法。
var someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing()
.catch(function(error) {
  console.log('oh no', error);
})
.then(function() {
  console.log('carry on');
});
// oh no [ReferenceError: x is not defined 错误打印
// carry on

//上面代码运行完catch方法指定的回调函数，会接着运行then方法指定的回调函数，如果没有错误，直接跳过catch。
Promise.resolve().catch(function(err) {
    console.log("error",err);
}).then(function(){
    console.log("继续执行");
})
//上面代码没有报错，跳过了catch，执行then里的方法，此时要是then里报错，就与前面的catch无关了。
//catch方法中还能再抛出错误。