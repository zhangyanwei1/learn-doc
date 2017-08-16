/**
 * Promise.prototype.then()：
 * Promise实例具有then方法，也就是说，then方法是定义在原型对象Promise.prototype上的。
 * 作用：为Promise实例添加状态改变时的回调函数。then方法第一个参数Resolved状态的回调函数，第二个是rejected状态的回调函数。
 * then方法返回一个新的Promise实例，不是原来那个Promise实例。因此，可以采用链式写法。
 */
getJSON('/posts.json').then(json => {
    return json.posts;
}).then(() => {
    //...
})
//上面代码中使用then方法，指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。

//采用链式的then，可以指定一组按照次序调用的回调函数。这是，前一个回调函数有可能返回一个Promise对象（有异步操作），
//这时后一个回调函数就会等待该Promise对象的状态发生变化，才会调用。

getJSON('/posts/1.json').then(
    post => getJSON(post.commentURL)
).then(
    comments => console.log('Resolved：',comments),
    err => console.log('Rejected：',err)
)