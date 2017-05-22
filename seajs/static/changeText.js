define(function(require,exports,module){
    //简单示例
    //var textContent = "yes,it works!";
    //exports.text=textContent;

    //模块方法
    var init = function(){
        var textContent = [
            'yes it works',
            'seajs demo',
            'it is a lucky day',
            'wish this help you',
            'thank you'
        ];
        var index = Math.floor(Math.random()*textContent.length);
        return textContent[index];
    }

    //对外提供接口
    module.exports = {
        //多个接口用“，”隔开
        init:init
    }
})