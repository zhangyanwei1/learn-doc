# 什么是viewport
viewport：“视区”。   
移动设备上的viewport就是设备的屏幕上能用来显示我们的网页的那一块区域。   
设备宽度：`screen.width`   

### 设备像素比devicePixelRatio
物理像素（physical pixel）：设备能控制显示的最小单位。   
设备独立像素（DIP，device-independent pixel，density-independent pixel）：独立于设备的用于逻辑上衡量像素的单位。

物理像素和设备独立像素(dips)的比例， 称为设备像素比。  
谷歌浏览器下window.devicePixelRatio，单位可以用dppx。它用于描述整个渲染环境在硬件设备上的缩放程度。   

单位dppx（dots per pixel）表示CSS中的单位px在屏幕上占用了多少物理像素。在PC上，这个值通常为1。浏览器提供了缩放功能，它实际上就是修改设备像素比来实现的，所以调整浏览器的缩放可以看到devicePixelRatio属性的变化。

### 屏幕尺寸 screen.width/height
它们包括用户屏幕的整个宽度和高度。它们的尺寸是以设备像素来进行度量的，因为它们永远不会变：它们是显示器的属性，而不是浏览器的。也就是前面定义的设备独立像素。

### 窗口尺寸 window.innerWidth/Height
浏览器窗口的整体大小，它告诉了你用户到底有多少空间可以用来做CSS布局。这个叫做物理像素。

## viewport
### 布局视口
通过 document.documentElement.clientWidth 来获取，如果把移动设备上浏览器的可视区域设为viewport的话，某些网站就会因为viewport太窄而显示错乱，所以这些浏览器就决定默认情况下把viewport设为一个较宽的值，比如980px，这样的话即使是那些为桌面设计的网站也能在移动浏览器上正常显示了。

### 理想视口
ideal viewport的宽度等于移动设备的屏幕宽度，只要在css中把某一元素的宽度设为ideal viewport的宽度(单位用px)，那么这个元素的宽度就是设备屏幕的宽度了，也就是宽度为100%的效果。ideal viewport 的意义在于，无论在何种分辨率的屏幕下，那些针对ideal viewport 而设计的网站，不需要用户手动缩放，也不需要出现横向滚动条，都可以完美的呈现给用户。

### meta标签设置viewport
```
<meta name="viewport" content="width=device-width,  
initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
```
content属性
+ width 控制 viewport 的大小，可以指定的一个值，如果 600，或者特殊的值，如 device-width 为理想视口宽度。
+ height 和 width 相对应，指定高度。
+ initial-scale 设置页面的初始缩放值，为一个数字，可以带小数。    
缩放是相对于ideal viewport来缩放的，缩放值越大，当前viewport的宽度就会越小，反之亦然。

+ maximum-scale：允许用户缩放到的最大比例。
+ minimum-scale：允许用户缩放到的最小比例。
+ user-scalable 是否允许用户进行缩放，值为"no"或"yes", no 代表不允许，yes代表允许

为什么需要有理想的viewport呢？比如一个分辨率为320x480的手机理想viewport的宽度是320px，而另一个屏幕尺寸相同但分辨率为640x960的手机的理想viewport宽度也是为320px，那为什么分辨率大的这个手机的理想宽度要跟分辨率小的那个手机的理想宽度一样呢？这是因为，只有这样才能保证同样的网站在不同分辨率的设备上看起来都是一样或差不多的。
