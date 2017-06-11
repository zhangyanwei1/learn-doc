## 元素大小
### 偏移量
元素在屏幕上所占的所有可见的空间   
+ offsetHeight：元素垂直方向上占用的空间大小，包括元素的高度、（可见的）水平滚动条高度、上下边框高度。
+ offsetWidth：元素水平方向上占用的空间大小，包括元素的宽度、（可见的）垂直滚动条高度、左右边框宽度。

+ offsetLeft：元素的左外边框至包含元素的左内边框的距离。
+ offsetTop：元素的上内边框至包含元素的上内边框的距离。  

offsetLeft与offsetTop属性与包含元素有关，包含元素可以通过offsetParent属性访问。   
图示：
![](http://images2015.cnblogs.com/blog/740839/201609/740839-20160901091826449-1099471755.jpg)

这里的offsetParent属性访问的不一定是父级元素  
#### [1] 元素自身无fixed定位，父级元素也无定位时：ooffsetParent访问的是body元素
```
<div class="outer">
    <div class="inner">
    
    </div>
</div>
<script>
    var inner = document.getElementsByClassName("inner")[0];
    var outer = document.getElementsByClassName("outer")[0];

    console.log(inner.offsetParent); //body
</script>
```
#### [2] 元素自身无fixed定位，父级元素有定位时：offsetParent访问的是直接父级元素
```
.outer{
    position:relative/absolute/fixed
}

console.log(inner.offsetParent);//outer
```
#### [3] 元素自身具有fixed定位时：offsetParent为null
```
.inner{
    position:fixed;
}

console.log(inner.offsetParent);//null
```
#### [4] body元素的offsetParent是null

如果需要知道元素在整个页面的偏移量，将这个元素的offsetLeft属性与其offsetParent的offsetLeft相加，直到根节点就可以得到。
```
//左偏移量，上偏移量就是用offsetTop属性
function getElementLeft(ele){
    var actualLeft = ele.offsetLeft;
    var current = ele.offsetParent;

    while(current!==null){
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }
    
    return actualLeft;
}
```

### 客户区大小
元素客户区大小有两个属性clientWidth与clientHeight属性   
客户区大小指元素内容+内边距的大小，边框不计算在内。

浏览器窗口大小访问document.body和document.documentElement的clientWidth、clientHeight
document.body访问的是body元素，body默认具有外边距
document.documentElement访问的是HTML元素   
所以两者访问的大小会不一致

### 滚动大小
指的是包含滚动内容的元素大小，html元素不执行代码也会自动添加滚动条，其他元素需要通过css的overflow属性添加。
相关属性：
+ scrollHeight：在没有滚动条情况下，元素内容的总高度。
+ scrollWidth：在没有滚动条下，元素内容的总宽度。
+ scrollTop：被隐藏在内容区域上方的像素距离，设置这个属性可以改变元素的滚动位置。
+ scrollLeft：被隐藏在内容区域左侧的像素距离，设置这个属性可以改变元素的滚动位置。

图示：
![](http://runninggiant.cn/kod/index.php?user/public_link&fid=3dceo8tA1PRmswB3YwdkS9ulcyGNRq6OKXwbPhaYpFRA-qV9AMaTPl2Co_F8fxFOrv5IHctBjQzRJ-O6fQWNZQzccG452-qSmahfyyVBHd0qlNBf3gYue0-fOr8q3ChljVOzkGdvEi-3d8VJjdeHZxdhbhz0o002MsUMTt4&file_name=/QQ%E5%9B%BE%E7%89%8720170607213840.png)