/**
 * 在浏览器中，全局对象指的就是window对象，在window上定义的任何内容都可以被全局访问到。
 * Node中有两个类似的对象：
 * 1、global对象：任何global上的对象都可以被全局访问到。
 * 2、process对象：所有全局执行上下文的内容都在process对象中。举例：在浏览器中浏览器窗口的名字就是window.name，
 *    在Node中，进程的名字就是process.title
 */
console.log(1);
process.nextTick(function () {
    console.log(3);
});
console.log(2);

//1
//2
//3
//process.nextTick函数可以将一个函数的执行时间规划到下一个事件循环中：通过异步的方法在最近的将来调用该函数。