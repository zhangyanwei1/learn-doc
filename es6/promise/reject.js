/**
 * Promise.reject(reason)方法也会返回一个新的Promise实例，该实例的状态为rejected。
 */
var p = Promise.reject('出错了');
//等同于
var p = new Promise((resolve,reject) => reject('出错了'))
p.then(null, function (s) {
  console.log(s)
});
// 出错了

//注意：Promise.reject()方法的参数，会原封不动的作为reject的理由，变成后续方法的参数。与Promise.resolve方法不一致。
const thenable = {
    then: function(resolve,reject) {
        reject('出错了');
    }
};
Promise.reject(thenable)
.catch(e => {
    console.log(e === thenable);
    console.log(e);
})
//true
//{then:[function:then]}
//上面代码中，Promise.reject方法的参数是一个thenable对象，执行以后，后面catch方法的参数不是reject抛出的“出错了”这个字符串，而是thenable对象。