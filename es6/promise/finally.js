/**
 * finally方法用于指定不管Promise随想最后状态如何，都会执行的操作。
 * 与done最大的区别就是他接收一个普通的回调函数作为参数，该函数不管怎样都必须执行。
 */
//实现
Promise.prototype.finally = function (callback) {
  let P = this.constructor;//P是一个Promise对象
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
//上面代码中，不管前面的Promise是fulfilled还是rejected，都会执行回调函数callback。

function myCallback() {
    console.log("callback");
}
Promise.resolve(myCallback());//callback