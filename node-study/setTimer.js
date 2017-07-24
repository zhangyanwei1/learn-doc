/*
单线程的世界
*/

var start = Date.now();

setTimeout(function () {
	//1000ms后打印出来现在的时间差
	console.log(Date.now() - start);

	//然后执行一段很耗时的循环
	for(var i = 0; i < 10000000000; i++) {}
},1000)

//检测这个定时器打印出的时间
setTimeout(function () {
	console.log(Date.now() - start);
},2000)

//第一次打印基本是1000
//第二次打印，如果循环很久，要等待很久才会输出结果，远远超出2秒

/*
原因：
事件轮询被JavaScript代码阻塞了。当第一个事件分发时，会执行JavaScript回调函数。
由于回调事件需要执行很长一段时间，所以下一次事件轮询执行的时间就远远超过了2秒。
*/

//执行时只有一个线程，也就是说，当只要一个函数执行时，同一时间不可能有第二个函数执行。。。
//NodeJs如何做到高并发的？

/*
堆栈的概念
*/
function a () {
	b();
}
function b () {}

//调用堆栈是a后面跟着b，当b执行完后，V8就不再执行任何代码了。

/*
Http服务器例子
*/
http.createServer (function () {
	a();
});
function a () {
	b();
}
function b () {}

//一旦HTTP请求到达服务器，Node就会分发一个通知。最终，回调函数会被执行，并且调用堆栈变为 a -> b 。

/*
Node 并不提供真正的并发操作，那样会引入更多的并行执行线程。
在调用堆栈执行非常快的情况下，同一时刻你无须处理多个请求。
v8执行JavaScript速度非常快，非阻塞IO确保了单线程执行时，不会因为有数据库访问或硬盘访问等操作而导致被挂起。
*/