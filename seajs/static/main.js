define(function(require, exports,module) {
    console.log(module.id);
    //引入模块
    //var changeText = require("../static/changeText.js");

    var title = document.getElementById("title");
    //title.innerHTML = "it works!";

    //使用设置别名调用，同步加载
    var changeText = require('changeText');//同步加载模块

    //调用模块暴露的接口
    //title.innerHTML = changeText.init();

    var $ = require('jquery');
    $('#title').text(changeText.init());


    /*异步加载模块
    require.async('changeText',function(changeText){
       title.innerHTML = changeText.init(); 
    })*/
    console.log(require.resolve('changeText'));//返回模块路劲
});