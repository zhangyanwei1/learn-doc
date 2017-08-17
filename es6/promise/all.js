/**
 * Promise.all():
 * 用于将多个Promise实例，包装成一个新的Promise实例。
 * var p = Promise.all([p1,p2,p3])
 * 上面代码中，Promise.all接收一个数组作为参数，p1、p2、p3都是Promise实例，
 * 如果不是，就先调用Promise.resolve方法，将参数转为Promise实例，再进一步处理。
 * 
 * p的状态由p1、p2、p3决定：
 * （1）只有p1、p2、p3都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
 * （2）只要p1、p2、p3之中有一个被rejected，p的状态就会变成rejected，此时第一个被reject实例的返回值，会传递给p的回调函数。
 */

// 生成一个Promise对象的数组
var promises = [2,3,4,5,11,13].map(function(id) {
    return new Promise(function(resolve,reject) {
        resolve("promise"+id);
    })
})
Promise.all(promises).then(function(all) {
    console.log(all);
}).catch(function(reason) {
    console.log(reason);
})
//['promise2','promise3','promise4','promise5','promise11','promise13']
//上面代码每一个Promise返回一个Promise加对应的id，组成数组，传给all的then，最后打印出一个数组。

//如果作为参数的Promise实例，自己定义了catch方法，那么他一旦被rejected，不会触发Promise.all()的catch方法。
const p1 = new Promise((resolve,reject) => {
    resolve('hello');
}).then(result => result)
.catch(e => e);

const p2 = new Promise((resolve,reject) => {
    throw new Error('报错了');
}).then(result => result)
.catch(e => e);

Promise.all([p1,p2]).then(result => {
    console.log(result)
}).catch(e => {
    console.log(e)
})
//['hello','Error 报错了']

//p1 Resolved，p2抛出错误，执行自己的catch方法，该方法返回一个新的Promise实例，然后p2就指向这个实例了。
//该实例执行完catch方法后，也会变成resolved，所以Promise.all()方法参数里面的两个实例都会resolved，
//因此会调用then方法指定的回调函数，而不会调用catch方法指定的回调函数。

//如果p2没有自己的catch方法，就会调用Promise.all()的catch方法。
const p3 = new Promise((resolve,reject) => {
    resolve('hello');
}).then(result => result);

const p4 = new Promise((resolve,reject) => {
    throw new Error('报错了');
}).then(result => result);

Promise.all([p3,p4]).then(result => {
    console.log(result)
}).catch(e => {
    console.log(e);
    console.log("捕获到了")
})
//Error 报错了

/**
 * Promise.race方法同样是将多个Promise实例，包装成一个新的Promise实例。
 * var p = Promise.race([p1, p2, p3]);
 * 上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。
 */