我们经常用BFC来解决一些问题：
+ 清除浮动
width+overflow:hidden.
+ 防止margin重叠
一个布局：
父元素拒上面20px，子元素拒上面40px。
考虑到边距合并，我本想用下面的方式实现
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>div空隙</title>
	<style>
		*{
			margin:0;
			padding: 0;
		}
		.wrap{
			height: 200px;
			width: 400px;
			background-color: pink;
			margin-top: 20px;
			padding-top: 40px;
			
		}
		.wrap div{
			/* margin-top: 40px; */
			width: 40px;
			height: 20px;
			background-color: #ccc;
		}
	</style>
</head>
<body>
	<div class="wrap">
		<div class="box1"></div>
	</div>
</body>
</html>
```
其中有一个问题：IE盒子模型、标准盒子模型
ie 盒子模型的 content 部分包含了 border 和 pading。IE5的。
标准 w3c 盒子模型的范围包括 margin、border、padding、content，并且 content 部分不包含其他部分。
所以上面的实现方式会造成布局不一致，宽高。
所以还是解决margin合并这种方式来思考。

问题：
+ 为什么BFC可以清楚浮动？
+ 为什么BFC可以防止margin重叠？
+ BFC是什么？原理。
解决了第三个问题前两个就解决了。