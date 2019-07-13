// 入口函数
window.onload = function(){
    // 搜索效果
    search();
    //轮播图
    banner();
    //倒计时
    downTime();
    //移动端轻触事件

    //移动端手势事件
}
function search(){
    var searchBox = document.getElementsByClassName('search_box')[0];
    var banner = document.getElementsByClassName('banner')[0];
    var heightBan = banner.offsetHeight;
    
    window.onscroll = function(){
        var top = document.documentElement.scrollTop;
        var opacity = 0;
        if(top > heightBan){
            opacity = 0.9;
        }
        else{
            opacity = 0.9*(top/heightBan);
        }
        searchBox.style.background = 'rgba(216,80,92,'+opacity+')';
    }
}


function banner(){
    //定义
    var banner = document.getElementsByClassName('banner')[0];
    var bigPic = document.getElementsByClassName('banner_bigPic')[0];

    var BanLi = bigPic.children[0];
    var liWidth = BanLi.offsetWidth;
    var index = 1;
    // 公共方法
    function translateXCon(){
        var num = (-10*index) + '%';
        bigPic.style.transform = 'translateX('+num+')';
        bigPic.style.webkitTransform = 'translateX('+num+')';
    }
    function translateXe(e){
        bigPic.style.transform = 'translateX('+e+'px)';
        bigPic.style.webkitTransform = 'translateX('+e+'px)';
    }
    function transitionCon(){
        bigPic.style.transition = 'all 0.2s';
        bigPic.style.webkitTransition = 'all 0.2s'; //兼容
    }
    function transitionRemoveCon(){
        bigPic.style.transition = 'none';
        bigPic.style.webkitTransition = 'none'; //兼容
    }
    //共用方法结束
    //自动轮播
    var timer = setInterval(function(){
        index ++;
        transitionCon();
        translateXCon();
        
    },2000)
    bigPic.addEventListener('transitionend',function(){
        if(index >= 9){
            index = 1;
            transitionRemoveCon();
            translateXCon();
        }
        else if(index <= 0){
            index = 8;
            transitionRemoveCon();
            translateXCon();
        }
        raPicMove();
    })
    function raPicMove(){
        var raPic = document.getElementsByClassName('banner_raPic')[0];
        var raPicLi = raPic.children;
        for(var i = 0; i < raPicLi.length ; i++){
            raPicLi[i].className = '';
        }
        raPicLi[index-1].className = 'now';
    }

    var startX = 0;
    var distantX = 0;
    //严谨判断
    var isMove = false;
    bigPic.addEventListener('touchstart',function(e){
        clearInterval(timer);
        startX = e.touches[0].clientX;
    })
    bigPic.addEventListener('touchmove',function(e){
        var moveX = e.touches[0].clientX;
        distantX = moveX - startX;
        // 计算将要做定位的位置
        console.log(distantX);
        var positionX = (-index * liWidth) + distantX;
        //清除过渡
        transitionRemoveCon();
        //移动到定位的位置
        translateXe(positionX);
        isMove = true;
    })
    bigPic.addEventListener('touchend',function(e){
        if(isMove){
            if(Math.abs(distantX) > liWidth / 3){
                //移动
                if(distantX > 0){
                    //向右
                    index --;
                }
                else{
                    //向左
                    index ++;
                }
                transitionCon();
                translateXCon();
                console.log('移动');
            }
            else{
                //吸附
                //过渡
                transitionCon();
                //位移
                translateXCon();
                console.log('吸附');
            }
        }
        clearInterval(timer);
        timer = setInterval(function(){
            index ++;
            transitionCon();
            translateXCon();
        },2000)
    })
    //重置参数
    startX = 0;
    distantX = 0;
    isMove = 0;

}
function downTime(){
    var sk_bg = document.getElementsByClassName('sk_bg');
    var time = 60 * 60 * 24;
    var timer = setInterval(function(){
        time --;
        var h = Math.floor(time / 3600);
        var m = Math.floor(time % 3600 / 60);
        var s = time % 60;

        sk_bg[0].innerHTML = Math.floor(h / 10);
        sk_bg[1].innerHTML = h % 10;

        sk_bg[2].innerHTML = Math.floor(m / 10);
        sk_bg[3].innerHTML = m % 10;

        sk_bg[4].innerHTML = Math.floor(s / 10);
        sk_bg[5].innerHTML = s % 10;

        if(time <= 0){
            clearInterval(timer);
        }
    },1000)
}