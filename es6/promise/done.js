/**
 * Promise对象的回调链，不管以then方法或catch方法结尾，要是最后一个方法抛出错误，都可能无法捕捉到。
 * 因此，可以提供一个done方法，总是处于回调链的尾端，保证抛出任何可能出现的错误。
 */
asyncFunc()
 .then(f1)
 .catch(r1)
 .then(f2)
 .done();

//实现代码
Promise.prototype.done = function (onFulfllied,onRejected) {
    this.then(onFulfllied,onRejected)
    .catch(function (reason) {
        //抛出一个全局错误
        setTimeout(() => {throw reason},0);
    })
}
//done方法的使用，可以像then方法那样用，提供Fulfilled和Rejected状态的回调函数，也可以不提供任何参数。
//但不管怎样，done都会捕捉到任何可能出现的错误，并向全局抛出。