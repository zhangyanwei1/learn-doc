# seaJs入门

### 目录结构
> seaJs/   
> sea-modules  //存放seajs、jQuery等模块部署文件  
> static//存放项目的js与css文件   
>  | --main.js   
> index.html //html文件

### 引入seaJs
在HTML文件中引入seaJs文件`<script src="sea-module/sea.js"></script>` 
seajs.use()方法一般用来加载模块入口文件   
可以加载单一模块 `seajs.use(' ')`  
可以加载模块后指定回调 `seajs.use(' ',function(a){a.some()})`      
也可加载多个模块 `seajs.use(['',''])`

### main.js
mainjs是模块的入口文件
#### define()     
define 是一个全局函数，用来定义模块。   
CMD规范用法  
``` 
define(function(require,exports,module){

})
```
+ require()  
在模块中**同步** 获取其他模块的接口     
require必须作为模块构造函数第一个参数并正确书写    
不能重新定义require函数    
require的参数必须是直接的字符串，不含变量 

+ require.async(' ',callback)   
在模块中**异步**获取其他模块接口    
模块加载完成后指定回调，在回调中使用模块方法     

+ exports   
对外提供接口   
不可以重写exports={}  
exports是module.exports的引用，只可以添加属性，不可以使用{}进行重写，重写无效  

+ module  
module 是一个对象，上面存储了与当前模块相关联的一些属性和方法。
id : 模块标识    
module.exports 对象对外提供接口

### jQuery引入
将jQuery源码改写成模块的方式，然后在需要的时候引入
```
define(function(require,exports,module){
    //jQuery源码
})
```
### 配置
加载seaJs后，可以对seajs进行配置
```
seajs.config({
    //配置       
})
```
[配置API](https://github.com/seajs/seajs/issues/262)


### 路径问题
./ 当前目录  
../上级目录

base配置项默认值seajs所在目录,demo中就是sea-module/
直接以文件名开头，在seajs中直接以文件名开头的路径是相对于base路径        
demo中对jQuery的引入就是如此base+‘jquery/jquery’（.js可以省略）