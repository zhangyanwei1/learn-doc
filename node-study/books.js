/*
定义一个图书数组，将图书信息返回给客户端
*/

//Node
var books = [
	"FirstBook",
	"SecondBook"
];

function serverBooks () {
	var html = '<b>' + books.join('</b><br><b>') + '</b>';

	//重置图书数组
	books = [];

	return html;
}

//等价PHP
$books = array(
	"FirstBook",
	"SecondBook"
);

function serverBooks () {
	$html = '<b>' .join( $books,'</b><br><b>') . '</b>';
	$books = array();
	return $html;
}

/*
node会将完整的图书信息请求返回给第一个请求，当再次进行第二个请求时，将返回空的；
PHP能将完整的图书信息返回给两个请求。

原因：
Node采用一个长期运行的进程。
而APache会产生多个进程，每次请求一个新的进程。
在PHP中，当解释器再次执行时，变量$books会被重新赋值，而Node不是，serverBooks会再次被调用，并且作用域中的变量不受影响。
*/

/*
阻塞的概念
*/

//PHP
print("Hello");
sleep(5);
print("World");

//Node
console.log("Hello");
setInterval(function () {
	console.log("world")
},5000);
console.log("Bye");

/*
1、PHP中，sleep一旦执行，执行会被阻塞一段时间，在阻塞时间前，不会有任何操作，这是同步的。
2、node使用回调函数。nodeJs采用了事件轮询。node会先注册事件，随后不断询问内部这些核心事件是否已经分发。
*/