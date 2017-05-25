# $.queue() 队列
queue既有实例方法，又有$静态方法    
$.queue就是创建一个队列，然后往里面添加函数,相当于数组的push方法，push的元素必须是函数。   

$.dequeue就相当于shift每次取出队列中的第一个值，并返回他，在队列上理解就相当于执行返回的函数。
```
function aaa(){
    alert("aaa");
}
//将aaa方法添加到队列中
$.queue(document,"q1",aaa);

//打印队列
console.log($.queue(document,"q1")) ;//aaa函数数组，只有一个元素

function bbb(){
    alert("bbb");
}
//将bbb添加到方法中
$.queue(document,"q1",bbb);

console.log($.queue(document,"q1")) ;//数组中具有两个元素了，aaa函数和bbb函数

//取出队列第一项
$.queue(document,"q1");//第一项是aaa函数，弹出aaa
$.queue(document,"q1");//aaa已出队，这是的第一项是bbb，弹出bbb

//使用空数组 []会将队列元素删除
```
队列用在HTML中，请参照demo。
## 源码学习
```
queue: function( elem, type, data ) {
    var queue;

    //元素存在才进行操作
    if ( elem ) {
       /* 如果没有传入字符串则默认是"fx"+"queue" */ 
        type = ( type || "fx" ) + "queue";

        //dataPriv=new Data()   从缓存中获取元素的值，第一次是undefined
        queue = dataPriv.get( elem, type );

        // Speed up dequeue by getting out quickly if this is just a lookup
        if ( data ) {
            /*
            * 第一次执行时 或者传进来的是数组 []，第一次执行创建一个数组
            * 第二次传入时，直接将值添加进队列末 queue.push( data );
            * 当传入数组时，就不会进入else，会直接替换队列。
            */
            if ( !queue || Array.isArray( data ) ) {
                queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
            } else {
                queue.push( data );
            }
        }
        return queue || [];
    }
}
```
```
Data.prototype = {
    // 为传入的对象添加一个属性expando
    cache:function(owner){} 

    //为owner对象添加键值对属性
    set: function( owner, data, value ) {}

    //如果key值未定义就返回cach，否则返回
    get: function( owner, key ) {
        return key === undefined ?
        this.cache( owner ) :

        // Always use camelCase key (gh-2257)
        owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
    },
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE 元素节点
	//    - Node.DOCUMENT_NODE document节点
	//  - Object 任何对象
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};
```
