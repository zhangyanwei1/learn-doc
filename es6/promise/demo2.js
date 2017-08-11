let promise = new Promise(function(resolve,reject){
    console.log("Promise");
    resolve();
});

promise.then(function(){
    console.log("Resolved");
});

console.log("Hi!");

//Promise
//Hi!
//Resolved

/**
 * Promise 新建后立即执行，所以首先输出的是Promise。
 * 然后，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以Resolved最后输出。
 */

/**
 * Promise实现Ajax
 */
var getJSON = function(url) {
    var promise = new Promise(function(resolve,reject){
        var client = new XMLHttpRequest();
        client.open("GET",url);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader("Accept","application/json");
        client.send();

        function handler() {
            if(this.readyState !== 4) {
                return;
            }
            if(this.status === 200){
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        }
    })
    return promise;
}
getJSON("/posts.json").then(function(json){
    console.log("Content"+json);
}, function(error) {
    console.error("出错了",error);
})