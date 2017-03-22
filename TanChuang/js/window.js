/**
 * Created by Kerwin on 2017/3/19.
 */
define(['widget','jquery','jqueryUI'],function(widget,$,$UI){

    function Window() {
        //添加cfg属性，类型同时是一个对象
        this.cfg = {
                width: 500,                    //窗口宽默认500px
                height: 300,                   //窗口高默认是300px
                title: "系统消息",              //窗口默认标题： 系统消息
                content: "",                   //窗口默认内容为空的
                hasCloseBtn: false,            //窗口默认不带关闭按钮
                hasMask: true,                 //窗口默认带遮罩层
                isDraggable: true,             //窗口默认可以拖动
                dragHandle: null,              //窗口默认没有拖动把手，整个窗口可以拖动
                skinClassName: null,           //默认窗口没有护肤功能
                text4AlertBtn: "确定",         //Alert弹窗按钮的文案默认为确定
                text4ConfirmBtn: "确定",       //Confirm弹窗按钮的文案默认为确定
                text4CancelBtn: "取消",        //取消按钮的文案默认为取消

                handler4AlertBtn: null,        //AlertBtn按钮自定义回调，默认为空
                handler4CloseBtn: null,        //CloseBtn按钮自定义回调，默认为空
                handler4ConfirmBtn: null,      //ConfirmBtn按钮自定义回调，默认为空
                handler4CancelBtn: null,       //CancelBtn按钮自定义回调，默认为空
                text4PrompBtn: "确定",         //PrompBtn弹窗按钮的文案默认为确定
                isPromptInputPassword: false,  //输入的内容是否已密码类型显示，默认不是密码类型
                defaultValue4PromptInput: "",  //PrompBtn弹窗默认内容为空
                maxlength4PromptInput: 10,     //输入内容长度默认是10个字符
                handler4PromptBtn: null        //PromptBtn按钮自定义回调，默认为空
        }
    }

    Window.prototype = $.extend({},new widget.Widget(), {
        //实现接口，添加DOM节点
        renderUI: function() {
            var footerContent = "";     //保存窗口底部按钮DOM节点
            switch(this.cfg.winType) {
                case "alert":
                    footerContent = '<input type="button" value="'+ this.cfg.text4AlertBtn +'" class="window_alertBtn"/>'
                    break;
                case "confirm":
                    footerContent = '<input type="button" value="'+ this.cfg.text4ConfirmBtn +'" class="window_confirmBtn"/><input type="button" value="'+ this.cfg.text4CancelBtn +'" class="window_cancelBtn"/>';
                    break;
                case "prompt":
                    this.cfg.content += '<p class="window_promptInputWrapper"><input type="'+ (this.cfg.isPromptInputPassword?"password":"text")+'" value="'+this.cfg.defaultValue4PromptInput+'" maxlength="'+this.cfg.maxlength4PromptInput+'"  class="window_promptInput"/></p>';
                    footerContent = '<input type="button" value="'+ this.cfg.text4PrompBtn +'" class="window_promptBtn"/><input type="button" value="'+ this.cfg.text4CancelBtn +'" class="window_cancelBtn"/>';
                    break;
            }
            this.boundingBox = $('<div class="window_boundingBox"><div class="window_body">'+ this.cfg.content +'</div></div>')

            if (this.cfg.winType !== 'common') { //如果不是通用窗口，才添加头部和尾部
                this.boundingBox = $('<div class="window_boundingBox"><div class="window_header">'+ this.cfg.title +'</div><div class="window_body">'+ this.cfg.content +'</div><div class="window_footer">'+footerContent+'</div></div>')
                /*
                 *  this.boundingBox.prepend('<div class="window_header">' + this.cfg.title + '</div>');
                 *  this.boundingBox.append('<div class="window_footer">'+ footerContent + '</div>');
                */
            }
            //如果有遮罩层，则创建一个，添加到body中
            if (this.cfg.hasMask) {
                 this._mask = $('<div class="window_mask"></div>');
                 this._mask.appendTo('body');
            }
            //如果有关闭按钮，则添加一个关闭按钮
            if (this.cfg.hasCloseBtn) {
                var closeBtn = $('<span class="window_closeBtn">X</span>');
                this.boundingBox.append(closeBtn);
            }
            //获得输入框节点的引用
            this._promptInput = this.boundingBox.find(".window_promptInput");

        },
        //实现接口，添加监听事件，组件级别和DOM级别事件监听
        bindUI: function() {
            var that = this;
            //绑定JQ中on方法，添加事件绑定
            this.boundingBox.on("click", ".window_alertBtn", function(){
                that.fire("alert");   //触发封装的自定义事件
                that.destroy();
            });
            this.boundingBox.on("click", ".window_closeBtn", function(){
                that.fire("close");   //触发封装的自定义事件
                that.destroy();
            });
            this.boundingBox.on("click", ".window_confirmBtn", function(){
                that.fire("confirm");   //触发封装的自定义事件
                that.destroy();
            });
            this.boundingBox.on("click", ".window_cancelBtn", function(){
                that.fire("cancel");   //触发封装的自定义事件
                that.destroy();
            });
            this.boundingBox.on("click", ".window_promptBtn", function(){
                that.fire("prompt",that._promptInput.val());   //that._promptInput.val() 获取输入文本内容
                that.destroy();
            });

            //组件级别自定义事件
            if (this.cfg.handler4AlertBtn) {
                this.on("alert", this.cfg.handler4AlertBtn);
            }
            if (this.cfg.handler4CloseBtn) {
                this.on("close", this.cfg.handler4CloseBtn);
            }
            if (this.cfg.handler4ConfirmBtn) {
                this.on("confirm", this.cfg.handler4ConfirmBtn);
            }
            if (this.cfg.handler4CancelBtn) {
                this.on("cancel", this.cfg.handler4CancelBtn);
            }
            if (this.cfg.handler4PromptBtn) {
                this.on("prompt", this.cfg.handler4PromptBtn);
            }
        },
        //实现接口，初始化组件属性,如拖动，换肤等属性
        syncUI: function() {
            this.boundingBox.css({
                width: this.cfg.width + 'px',
                height: this.cfg.height + 'px',
                left: (this.cfg.x || (window.innerWidth - this.cfg.width)/2) + 'px',
                top:  (this.cfg.y || (window.innerHeight-this.cfg.height)/2) + 'px'
            });

            if (this.cfg.skinClassName) {
                this.boundingBox.addClass(this.cfg.skinClassName);
            }

            if (this.cfg.isDraggable) {
                if (this.cfg.dragHandle) {
                    //调用JQ里的draggable方法，传入拖动把手
                    this.boundingBox.draggable({handle: this.cfg.dragHandle});
                }
                else {
                    this.boundingBox.draggable();
                }
            }
        },
        //实现接口，销毁前的处理函数，类似析构函数
        destructor: function() {
            //当存在遮罩节点时候，则移除遮罩节点
            this._mask && this._mask.remove();
        },

        alert: function(cfg) {
            $.extend(this.cfg, cfg, {winType: "alert"});
            this.render();
            return this; //实现连缀语法
        },
        confirm: function(cfg) {
            $.extend(this.cfg, cfg, {winType: "confirm"});
            this.render();
            return this; //实现连缀语法
        },
        prompt: function(cfg) {
            $.extend(this.cfg, cfg, {winType: "prompt"});
            this.render();

            return this; //实现连缀语法
        },
        common: function(cfg) {
            $.extend(this.cfg, cfg, {winType: "common"});
            this.render();
            return this; //实现连缀语法
        }


    });

    return {
        Window: Window
    }
});

