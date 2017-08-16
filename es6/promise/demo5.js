/**
 * Promise.prototype.catch方法用于指定发生错误时的回调函数。
 */
getJSON('posts.json').then(function(posts){
    //..
}).catch(function(err){
    //处理getJSON 和前一个回调函数运行时发生的错误
    console.log('发生错误!', err);
})
//getJSON方法返回一个promise对象，如果状态变为Resolved，则会调用then方法指定的回调函数。
//如果异步操作抛出错误，状态变为Rejected，就会执行catch方法指定的回调函数，处理这个错误。
//如果then方法指定的回调函数在运行时抛出错误，也会被catch方法捕获。

var p = new Promise(function(resolve,reject) {
    //resolve("promise");
    reject("promise");
});
p.then(
    (val) => console.log('fulfilled:',val)
).catch(
    (err) => console.log("rejected",err)
);

//等同于
p.then(
    (val) => console.log("fulfilled:",val)
).then(
    null,(err) => console.log("rejected",err)
)
//Promise.prototype.catch方法是.then(null,rejeaction)的别名，用于指定发生错误时的回调函数。