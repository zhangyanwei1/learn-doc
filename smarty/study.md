## Smarty学习小记
### 变量
{ $value }   
访问数组变量 { $arr.name } //name代表下边相当于 $arr[0]   
访问对象属性 { $foo->bar } //bar是foo的属性   

### Smarty内置函数
#### { $var=... } 在模板内部对变量进行赋值，或者对数组元素进行赋值。
简单赋值 `{ $name="Bob" }`    
对数组元素赋值 `{ $project["name"]="ipr-cc" }`
#### { block } { /block } 定义一块区域   
参数 name {block name="blockName"}，模板区域的名称  
可选参数 

|名称|说明|  
|:----:|:----:|
|append|block区域代码将附加到父模块block内容之后|
|prepend|block区域代码将附加到父模块block内容之前|
|hide|在没有该名称区域的时候，忽略区域内容|

示例：
```
//parent
<html>
  <head>
    <title>{block name="title"}Default Title{/block}</title>
    <title>{block "title"}Default Title{/block}</title>  {* short-hand  *}
  </head>
</html>
//child
{extends file="parent.tpl"} 
{block name="title"}
Page Title
{/block}
//输出
<html>
  <head>
    <title>Page Title</title>
  </head>
</html>
```
#### { extends } 模板继承中，你可以在子模板内使用{extends}标签来扩展父模板。
注意：
+ {extends}必须放在模板的第一行。
+ 如果子模板要用{extends}来扩展父模板，那么它只能有 {block}的区域。任何其他的模板内容都会被忽略。    

参数：file    
`{ extends file="ipr-cc/page/common/layout.tpl" }`   
#### { for }{ forelse } { /for }用于创建一个简单的循环。
用法：
+ ` { for $var=$start to $end }  {/for}`
+ 参数 max 循环次数
```
<ul>
{for $foo=1 to 10 max=3}
    <li>{$foo}</li>
{/for}
</ul>
//输出
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>
```

#### { foreach } , { foreachelse } { /foreach }用于循环数组
用法：
`{foreach $arrayvar as $itemvar}`//arrayvar循环数组，，，itemvar每一项的值
+ { foreach }循环可以被嵌套使用
+ 如果数组中没有值 {foreachelse}将执行

```
//一维数组 循环 myColor=[red,blue,green]
<ul>
{foreach $myColors as $color}
    <li>{$color}</li>
{/foreach}
</ul>
//输出
<ul>
    <li>red</li>
    <li>blue</li>
    <li>green</li>
</ul>

//二维数组循环
<ul class="cc-status-wrap">
    {%foreach $userName as $userFirst%} //第一次循环的值作为二次循环的数组
    <li>
        <ul class="cc-status-second">
            {%foreach $userFirst as $userSecond%}
            <li>{%$userSecond%}</li>
            {%/foreach%}
        </ul>
    </li>
    {%/foreach%}
</ul>

//键值对数组键值访问
<ul>
{foreach $myPeople as $value}
   <li>{$value@key}: {$value}</li>
{/foreach}
</ul>
//输出
<ul>
    <li>fname: John</li>
    <li>lname: Doe</li>
    <li>email: j.doe@example.com</li>
</ul>
```
#### { if },{ elseif },{ else },{ /if } 条件判断

|运算符|Smarty名|示例
|:---:|:---:|:---:|
|=||
|!=||
|>||
|<||
|>=||
|<=||
|===||
|!||
|%||


#### {include} 用于载入其他模板到当前模板中。 在包含模板中可用的变量，载入后在当前模板仍然可用
+ {include}必须设置file 属性，设置载入的文件资源路径。

+ 设置了可选的assign属性，将{include}模板的内容赋值到变量，而并非输出。使用变量就可以输出内容。

+ 包含模板时，可以像使用属性一样设置传递的变量。 这样传递的变量，作用范围仅限于包含的模板内。 属性传递的变量将覆盖原包含模板的同名变量。
