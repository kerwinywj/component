/**
 * Created by Kerwin on 2016/11/27.
 */
$(document).ready(function(){


    changeCity(); //改变地址
    topbanner(); //双十一横幅
    autoPlay();   //头部轮播图
//    switchConv(); //切换便捷内容
    todayLoop(); //今日推荐右侧轮播特效
    guessWhatYouLike();//猜你喜欢切换效果
    redLine(); //猜你喜欢换背景及红线特效
    floorTabs(0);//楼层选项卡切换效果 第1层楼
    floorTabs(1);
    autoF1Play(); //1楼层自动轮播
    discountEffect(); //天天低价轮播图

//改变地址
function changeCity() {
    var city = document.getElementById("city");
    var snavLeft = getByClass("site-nav-send-left",document)[0];
    var sendAdd = document.getElementById("send-address");
    var selectA = sendAdd.getElementsByTagName("a");
    snavLeft.onmouseover = function() {
        sendAdd.style.display = "block";
    }
    snavLeft.onmouseout = function() {
        sendAdd.style.display = "none";
    }
    for (var i=0; i<selectA.length; i++) {
        selectA[i].onclick = function() {
            for (var j=0; j<selectA.length; j++) {
                sendAdd.style.display = "none"; //点击选中城市后，隐藏面板
                city.innerHTML = this.innerHTML;//把当前城市的替代city名字
                selectA[j].className="";        //遍历 清空所有城市选中的样式
                this.className = "address-select";
            }
        }
    }
}

//双十一横幅
function topbanner() {
    var topb = $('#topbanner');
    $("#topbanner-dobule11").click(function(){
        $(topb).fadeOut();//淡出效果
    })
}

//头部轮播图
function autoPlay() {
    var num = 0;
    var img = $('.main-loop-imgs img'); //取到6张轮播图片
    var changeBtn = $('.main-loop-radius'); //取到6个小数字按钮
    var rBtn = $('.main-loop-buttons-r');
    var lBtn = $('.main-loop-buttons-l');


    var timer = setInterval(loop,3000);

    //定义轮播函数,默认是向右轮播
    function loop() {
        num++;
        if (num > 5) {
            num = 0;
        }
        img.fadeOut();
        img.eq(num).fadeIn();
        changeBtn.css({background: '#3e3e3e'});
        changeBtn.eq(num).css({background: '#B61B1F'});

    }

    // 设置左右按钮click效果
    rBtn.click(function(){
        loop(); //向右轮播
    });
    lBtn.click(function(){ //向左轮播
        num--;
        if(num < 0){
            num = 5;
        }
        img.fadeOut();
        img.eq(num).fadeIn();
        changeBtn.css({background:'#3e3e3e'});
        changeBtn.eq(num).css({background:'#B61B1F'});
    });

    //设置图片Hover效果，hover时轮播停止，左右按钮出现；鼠标离开时，轮播继续，按钮消失
    img.hover(function(){
        rBtn.show();
        lBtn.show();
        clearInterval(timer);
    }, function(){
        rBtn.hide();
        lBtn.hide();
        timer = setInterval(loop,3000);
    })

    //设置图片下部圆形切换按钮hover效果，hover时轮播停止，颜色改变，同时切换到相应的图片，鼠标离开时，轮播继续
    changeBtn.hover(function(){
        var index = $(this).index();//获得changeBtn元素相对于它同级元素的index
        changeBtn.css({background:'#3e3e3e'});
        $(this).css({background:'#B61B1F'});
        img.fadeOut();
        img.eq(index).fadeIn();
        num = index;  //把当前index 重置到轮播到num
        clearInterval(timer);
    }, function(){
        timer = setInterval(loop,3000);
    })

    //设置左右按钮hover效果，hover时按钮出现，轮播停止，鼠标离开时,轮播开始,按钮消失
    lBtn.mouseover(function() {
        lBtn.show();
        rBtn.show();
        clearInterval(timer);
    })
    rBtn.mouseover(function(){
        lBtn.show();
        rBtn.show();
        clearInterval(timer);
    })
    lBtn.mouseout(function(){
        rBtn.hide();
        lBtn.hide();
        timer = setInterval(loop,3000);
    })
    rBtn.mouseout(function(){
        rBtn.hide();
        lBtn.hide();
        timer = setInterval(loop,3000);
    })


}

//今日推荐右侧轮播特效
function todayLoop() {
    var imgs = $('.change-img img');
    var changeboxes = $('.change-boxes');
    var arrowGroup = $('.arrow-group');
    var leftArrow = $('.left-arrow');
    var rightArrow = $('.right-arrow');
    var cib = $('.change-img-box');
    var cibLen = cib.length;

    //当鼠标进入图片和进入按钮区域时候，左右按钮出现,离开时，左右按钮消失
    imgs.mouseover(function() {
        arrowGroup.show();
    });
    imgs.mouseout(function(){
        arrowGroup.hide();
    });
    arrowGroup.mouseover(function(){
        arrowGroup.show();
    });
    arrowGroup.mouseout(function(){
        arrowGroup.hide();
    });


    //轮播函数的实现
    var num = 1;
    function changeGo(direction) {
        if (direction == "l") {
            num++;
            if (num == 5) {
                changeboxes.animate({left: -1004*num},1000,function(){ //重置到最后一个附属小组图
                    changeboxes.css({'left':'-1004px'});//置回到实际的第一个小组图（pic1~pic4）
                })
                num = 1; //更新num的值
            } else {
                changeboxes.animate({left: -1004*num},1000);
            }
        }
        else if (direction == "r") {
            num--;
            if (num == 0) {
                changeboxes.animate({left: -1004*num},1000,function(){//重置到第一个附属小组图
                    changeboxes.css({'left':'-4016px'});//置回到实际的最后一个小组图（pic13~pic16）
                })
                num = 4;//更新num的值
            }
            else {
                changeboxes.animate({left:-1004*num},1000);
            }
        }
    }

    //设置左右按钮click效果,点击左边按钮，向左边轮播，点击右边按钮，向右边轮播
    leftArrow.click(function(){
        changeGo("l");
    })
    rightArrow.click(function(){
        changeGo("r");
    })
}

//猜你喜欢切换效果
function guessWhatYouLike() {
    var getchange = $('.getchange');
    var imgboxes = $('.like-content-c');
    var num = 0;
    getchange.click(function(){
        num++;
        if (num == imgboxes.length) {
            num = 0;
        }
        imgboxes.hide();
        imgboxes.eq(num).show();
    })
}

//猜你喜欢换背景及红线特效
function redLine() {
    var getchange = $('.getchange');
    var yBtn = $('.youlike-btn');
    var redLine = $('.i');
    var circle = $('.circle');
    getchange.hover(function() {
        yBtn.attr('src','images/youlikeBtnHover.png');
        /*1秒内从左侧起点（1210px,0)到右侧终点，宽度从0到365px变换*/
        redLine.css({'right':'1210px','width':'0'}).animate({right:'0',width:'365px'},1000);
        circle.css({'right':'1210px'}).animate({right:'-2px'},1000);
    }, function(){
        yBtn.attr('src','images/youlikeBtn.png');
        redLine.css({'right':'0','width':'365px'});
        circle.css({'right':'-2px'});
    })
}

//楼层选项卡切换效果
function floorTabs(num) {
    var floor = $('.activefloor').eq(num); //匹配当前选中的是第几层楼
    var tabBtn = floor.find('.tabItem');
    var a = floor.find('.cloactivelia'); //找到默认选中的 大牌 a

$(".tabItem").each(function(index){
    $(this).on('mouseover', function(){ //绑定mouseover事件
    $(".F1-mian").hide().eq(index).show();
    })
});
$(".tabItem").each(function(index){
    $(this).on('mouseover', function(event){
    $(".tabItem").removeClass('cloactiveli').eq(index).addClass('cloactiveli');
    })
});

$(".cloactivelia").each(function(index){
    $(this).on('mouseover',function(event){
        $(".cloactivelia").removeClass('cloactivelialast').eq(index).addClass('cloactivelialast');
    })
});

}

//1楼层无缝左右切换自动轮播
function autoF1Play() {

    var i = 0;
    var clone = $(".imgbox li").first().clone();
    $(".imgbox").append(clone);
    var size = $(".imgbox li").size();//获取焦点图片的总数

    for (var j=0; j<size-1; j++) { //生成4个小圆点Dom结构
        $(".clothesF1cont-m-m .num").append("<li></li>");
    }
    $(".clothesF1cont-m-m .num li").first().addClass("on"); //默认第一个小圆点被选中，为红色


    /*鼠标划入圆点效果实现*/
    $(".clothesF1cont-m-m .num li").hover(function () {
        var indexCle = $(this).index(); //当鼠标放上某个小圆点，获取当前元素的索引值 从0开始
        i = indexCle; //因为当鼠标划入圆点后，i的值已经被修改，不再是0开始，因为要把i的值更新为当前indexCle的值
        $(".clothesF1cont-m-m .imgbox").stop().animate({left: -indexCle*439}, 1000);
        $(this).addClass("on").siblings().removeClass("on");
    })

    /*自动轮播实现 默认是向左轮播*/
    var t = setInterval(moveL,2000);

    /*对banner定时器的操作*/
    $(".clothesF1cont-m-m").hover(function(){
        clearInterval(t);
    }, function(){
        t = setInterval(moveL,3000);
    })

    $(".clothesF1cont-m-m .btn_l").click(function(){
       moveL(); //向左切换轮播
    })

    $(".clothesF1cont-m-m .btn_r").click(function(){
        moveR(); //向右切换轮播
    })
    /*向左按钮的点击效果实现*/
    function moveL() {
        i++;
        if (i == size) {
            $(".imgbox").css({left: 0});//通过CSS的left值瞬间回到真实第一张图片位置
            i = 1;//接着回到用户看到的第2张轮播图位置
        }
        $(".clothesF1cont-m-m .imgbox").stop().animate({left: -i*439}, 1000);
        if (i == size-1) {
            $(".clothesF1cont-m-m .num li").eq(0).addClass("on").siblings().removeClass("on");
        }
        else {
            $(".clothesF1cont-m-m .num li").eq(i).addClass("on").siblings().removeClass("on");
        }
    }
    /*向右按钮的点击效果实现*/
    function moveR() {
        i--;
        if (i == -1) {
            $(".imgbox").css({left:-(size-1)*439});//通过CSS的left值瞬间回到最后一个张图，即第一张图的复制图(其实让用户看起来感觉还是第一张图)
            i = size-2;//回到用户看到的最后一张图（程序员看来是倒数第二张图，算上复制图）
        }
        $(".clothesF1cont-m-m .imgbox").stop().animate({left: -i*439}, 1000);
        $(".clothesF1cont-m-m .num li").eq(i).addClass("on").siblings().removeClass("on");
    }
}

/*天天低价轮播图效果*/
function discountEffect() {
    var i = 0;
    var clone = $('.discount-rightbox-comment li').first().clone();
    $('.discount-rightbox-comment').append(clone);
    var clone2 = $('.discount-rightbox-comment li.commentImg').clone();
    $('.discount-rightbox-comment').append(clone2);
    var size = $('.discount-rightbox-comment li').size();

    /*自动轮播实现 默认是向上轮播*/
    var t = setInterval(moveTop,2000);

    /*对discount-rightboxs定时器的操作, 鼠标放上时，轮播停止，鼠标离开后，轮播继续*/
    $('.discount-rightboxs').hover(function(){
        clearInterval(t);
    }, function(){
        t = setInterval(moveTop,2000);
    })

    /*向上轮播函数实现*/
    function moveTop() {
        i++;
        if (i == size-1) {
            $('.discount-rightbox-comment').css({top: 0});
            i = 1;
        }
        $(".discount-rightbox-comment").stop().animate({top: -i*140},1000);
    }
}



//获取类名（封装的函数）
function getByClass(sClass, oParent) {
    var aEle = oParent.getElementsByTagName("*");//*通配符，代表任意的标签
    var aResult = [];
    var re = new RegExp('\\b'+sClass+'\\b','i');

    for (var i=0; i<aEle.length; i++) {
        if (re.test(aEle[i].className)) {
            aResult.push(aEle[i]);
        }
    }
    return aResult;
 }
});