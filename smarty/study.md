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
运算表达式：

|运算符|Smarty名|示例
|:-----:|:-----:|:-----:|
|=|eq| $a eq $b |
|!=|neq| $a neq $b |
|>|gt| $a gt $b |
|<|lt| $a lt $b |
|>=|ge| $a ge $b |
|<=|le| $a le $b |
|===||$a === 0|
|!|not| not $a |
|%|mod| $a mod $b |
运用：
```
{if $name eq 'Fred'}
    Welcome Sir.
{elseif $name eq 'Wilma'}
    Welcome Ma'am.
{else}
    Welcome, whatever you are.
{/if}
```

#### {include} 用于载入其他模板到当前模板中。 在包含模板中可用的变量，载入后在当前模板仍然可用
+ {include}必须设置file 属性，设置载入的文件资源路径。

+ 设置了可选的assign属性，将{include}模板的内容赋值到变量，而并非输出。使用变量就可以输出内容。

+ 包含模板时，可以像使用属性一样设置传递的变量。 这样传递的变量，作用范围仅限于包含的模板内。 属性传递的变量将覆盖原包含模板的同名变量。

常用属性：

|参数|类型|必填|说明|
|:----:|:----:|:----:|:----:|
|file|String|是|包含载入的文件名|
|assign|String|否|将包含的文件内容赋值给变量|
|scope|String|否|定义被包含模板的赋值变量作用范围: 'parent','root' 或 'global'|
|[var...]|[vartype]|否|传递到包含模板的变量|

+ {include} 传递变量
```
{include 'links.tpl' title='Newest links' links=$link_array}
{* body of template goes here *}
{include 'footer.tpl' foo='bar'}

//link.tpl
<div id="box">
<h3>{$title}{/h3>
<ul>
{foreach from=$links item=l}
.. do stuff  ...
</foreach}
</ul>
</div>
```
+ {include} 作用范围示例   
在包含的模板内赋值的变量，在包含模板内可见。
```
{include 'sub_template.tpl' scope=parent}
...
{* display variables assigned in sub_template *}
{$foo}<br>
{$bar}<br>
...

// sub_template.tpl 模板
...
{assign var=foo value='something'}
{assign var=bar value='value'}
...
```
+ {include} 关闭缓存
```
//包含模板将不被缓存
{include 'sub_template.tpl' nocache}
...
```
+ {include} 单独的缓存时间
```
//包含模板将单独设置缓存时间500秒。
{include 'sub_template.tpl' cache_lifetime=500}
...
```
+ {include}开启缓存
```
//包含模板的缓存将独立于全局模板缓存设置之外。
{include 'sub_template.tpl' caching}
...
```
+ {include} 和赋值变量
```
//将nav.tpl的内容赋值给了$navbar 变量, 该变量将页面的头部和底部显示。
<body>
  {include 'nav.tpl' assign=navbar}
  {include 'header.tpl' title='Smarty is cool'}
    {$navbar}
    {* body of template goes here *}
    {$navbar}
  {include 'footer.tpl'}
</body>

```
#### {nocache}用于关闭模板区块的缓存。 {nocache}都必须和一个{/nocache}匹配。
 

#### {section}可以循环遍历 连续数字索引的数组,区别于{foreach} 可以循环任意关联数组。
|参数名称|	类型|	必选参数|	说明|
|:---:|:---:|:---:|:---:|
|name|	string|	Yes|section的名称|
|loop|	mixed	|Yes	|用于循环的值|
|start|	integer|	No	|	设置开始循环的下标。如果设置成负值，则会从数组的结束位置开始。 比如说，如果数组中有7个元素，设置该值为-2，则循环将从下标5开始。 设置了不正确的值（比如说在数组长度以外的值）那么会自动计算为最接近的值。|
|step	|integer|	No	|循环的步长值。比如，step=2将循环下标0,2,4,等。 如果step值设置成负数，那么将从最后开始计算步长。|
|max|	integer|	No|设置最大的循环次数。|
|show|	boolean	|No	|	是否显示循环内容|

+ name 和 loop是必须的参数。
+ loop一般是数组，决定了{section}的循环次数。 同时你也可以传递一个整数指定循环次数。

#### {while}
 每个{while}必须有相应的{/while}.
 while中可以运用表达式：具体跟if差不多。
 ```
{while $foo > 0}
  {$foo--}
{/while}
 ```