/**
 * Created by Kerwin on 2017/3/19.
 */

//建立Jquery，Jquery-ui模块和路径的映射关系
require.config({
	waitSeconds: 0,
    paths: {
        jquery: 'jquery-1.10.2',
        jqueryUI: 'jquery-ui'
    }
});

require(['jquery','window'],function($, w){
    $('#a').click(function(){
        var win = new w.Window();
            win.alert({
                title: "提示",
                content: "welcome!",
                width: 300,
                height: 150,
                y: 50,
                hasCloseBtn: true,
                text4AlertBtn: "OK",
                dragHandle: ".window_header",
                //skinClassName: "window_skin_a",

                handler4AlertBtn: function() {
                    alert("你第一次点击了OK按钮");
                },

                handler4CloseBtn: function() {
                    alert("你第一次点击了关闭按钮");
                }
            });

        win.on("alert", function() { alert("第二次点击了OK按钮!");});
        win.on("alert", function() { alert("第三次点击了OK按钮!");});
        win.on("close", function() { alert("第二次点击了关闭按钮!");});
    });


    $('#b').click(function(){
        var win= new w.Window();

        win.confirm({
            title: "系统消息",
            content: "您确定要删除这个文件吗？",
            width: 300,
            height: 165,
            y: 50,
            text4ConfirmBtn: "是",
            text4CancelBtn: "否",
            hasCloseBtn: true,
            dragHandle: ".window_header"
        }).on("confirm", function(){
            alert("确定");
        }).on("cancel", function(){
            alert("取消");
        });

    });


    $('#c').click(function(){
        var win= new w.Window();

        win.prompt({
            title: "请输入您的名字",
            content: "我们将会为您保密您输入的信息.",
            width: 300,
            height: 200,
            y: 50,
            text4PromptBtn: "输入",
            text4CancelBtn: "取消",
            defaultValue4PromptInput: "张三",
            dragHandle: ".window_header",
            hasCloseBtn: true,
            handler4PromptBtn: function(inputValue) {
                alert("您输入的内容是："+ inputValue);
            },
            handler4CancelBtn: function() {
                alert("取消");
            }
        }).on("confirm", function(){
            alert("确定");
        }).on("cancel", function(){
            alert("取消");
        });

    });


    $('#d').click(function(){
        var win= new w.Window();

        win.common({
            content: "我是一个通用弹窗",
            width: 300,
            height: 150,
            y: 50,
            hasCloseBtn: true
        });

    });


});