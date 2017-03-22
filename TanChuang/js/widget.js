/**
 * Created by Kerwin on 2017/3/19.
 */
define(['jquery'],function($){

    //定义一个Widget抽象类
    function Widget() {
        this.boundingBox = null;    //最外层容器
    }

    Widget.prototype = {

        //接口，添加DOM节点
        renderUI: function() {},
        //接口，绑定事件
        bindUI: function() {},
        //接口，初始化组件属性,如拖动，换肤等属性
        syncUI: function() {},
        //接口，销毁前的处理函数，类似析构函数
        destructor: function() {},

        //渲染整个组件方法
        render: function(container) {
            this.renderUI();
            this.handlers = {};     //在这里定义handlers 对象
            this.bindUI();
            this.syncUI();
            $(container || document.body).append(this.boundingBox);
        },
        //销毁组件方法
        destroy: function() {
            this.destructor();
            this.boundingBox.off();  //取消绑定在boundingBox上DOM层面的事件
            this.boundingBox.remove(); //移除组件最外层DOM节点

        },
        //组件级别，自定义事件 监听事件
        on: function(type, handler) {
            if (typeof this.handlers[type] == 'undefined') {
                this.handlers[type] = [];
            }
            this.handlers[type].push(handler);
            return this; //链式调用
        },
        //何时出发自定义事件，当触发时，自动去遍历所有handler，利用观察者模式
        fire: function(type, data) {
            if (this.handlers[type] instanceof Array) {
                var handlersArr = this.handlers[type];
                for (var i=0; i<handlersArr.length; i++) {
                        handlersArr[i](data);
                }
            }
        }
    }

    return {
        Widget: Widget
    }
});