## 间歇调用和超时调用

### 超时调用

使用window的setTimeout()方法    
两个参数：要执行的代码块，以毫秒表示的事件。      
示例：
```
var timeDemo=setTimeout(function(){
  alert("调用了setTimeout");
},2000);
```
表示等待2s执行一段代码。     
但是，经过一定时间也不一定执行，JavaScript是单线程的，一定时间只能执行一段代码，为了控制要执行的代码，有一个JavaScript任务队列。setTimeout第二个参数告诉JavaScript再过多长时间把当前任务推到执行队列中。     
```
var start=new Date();
var time1=setTimeout(function(){
    var end = new Date();
	var t = end-start;
	console.log("间隔："+t);
},1000);
//间隔：1005
```
+ setTimeout()运行机制    
必须要等到当前脚本的同步任务和“任务队列”中已有的事件，全部处理完以后，才会执行setTimeout()指定的任务。  
```
setTimeout(function(){
console.log("timeout");
},0);
console.log("开始执行");

// 开始执行
// timeout
```

### 间歇调用
setInterval()函数的用法与setTimeout()完全一致，区别仅仅在于setInterval()指定某个任务每隔一段时间就执行一次，也就是无限次的定时执行。    
+ setInterval()运行机制
setInterval()的运行机制是，将指定的代码移出本次执行，等到下一轮Event Loop时，再检查是否到了指定时间。如果到了，就执行对应的代码；如果不到，就等到再下一轮Event Loop时重新判断。这意味着，setTimeout()指定的代码，必须等到本次执行的所有代码都执行完，才会执行。

这个时间定时到底准吗？
如果我需要写一个50s定时，直接采用他们的定时比较好，还是在回调函数里利用Date对象控制时间。
下面这种是不是精确一些？
```
var start=new Date();
var time = setInterval(function(){
	var end=new Date();
	if(end-start>=1000) {
		var t=end-start;
		console.log("时间"+t);
		start=new Date();
	}
},20)
```