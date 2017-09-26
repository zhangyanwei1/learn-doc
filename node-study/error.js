/**
 * Node应用依托一个拥有大量共享状态的大进程中，
 * 在一个HTTP请求中，如果某个回调函数发生了错误，整个进程都会遭殃：
 * 因为错误未被捕获，若访问Web服务器，进程就会崩溃。
 * 如果添加了UNcatchException处理器，就不一样了，这时，进程不会退出并且之后的事情都在你的掌握之中。
 */

process.on('uncaughtException',function (err) {
    console.error(err);
    process.exit(1);
})
console.log(process.title);