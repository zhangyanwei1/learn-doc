## Date类型
Date对象是基于1970年1月1日起的毫秒数

### Date构造函数
通过date构造函数来实例化日期对象：不加new操作符将会返回一个字符串，而不是一个日期对象。 
在调用Date不传参数的情况下，会自动获取当前的日期和时间，如果想根据特定的日期创建对象，需要传入表示该日期的毫秒数。   
```
Date.parse('1970/1/1')    //0
//一般传入一个表示日期的字符串就可以，如果不能表示日期，则返回NAN
//将日期字符串传入Date，内部也会调用Date.parse()。
new Date(0);            //Thu Jan 01 1970 08:00:00 GMT+0800 (中国标准时间)
```
构造函数参数传递
```
new Date();
new Date(value);
new Date(dateString);
new Date(year, month[, day[, hour[, minutes[, seconds[, milliseconds]]]]]);
```
+ value  代表自1970年1月1日00:00:00 (世界标准时间) 起经过的毫秒数。（时区）
+ dateString 表示日期的字符串值。
+ year 代表年份的整数值。
+ month 代表月份的整数值从0（1月）到11（12月）。
+ day 代表一个月中的第几天的整数值，从1开始。 
+ hour 代表一天中的小时数的整数值 (24小时制)。 
+ minutes 分钟数。
+ seconds 秒数。

[Date对象原型方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date)