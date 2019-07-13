// 手机触摸
window.onload = function(){
    
    isScrollLeft();
}
function isScrollLeft(){
    var ulBox = document.getElementsByClassName('main_left_ulBox')[0];
    var startY = 0,
        moveY = 0,
        distanceY = 0,
        currentY = 0;   //定位当前位置
    ulBox.addEventListener('touchstart',function(e){
        startY = e.touches[0].clientY;
    })
    ulBox.addEventListener('touchmove',function(e){
        moveY = e.touches[0].clientY;
        distanceY = moveY - startY;
        var translateY = currentY + distanceY;
        ulBox.style.transform = "translateY("+ translateY +"px)";
        ulBox.style.webkitTransform = "translateY("+ translateY +"px)";
    })
    ulBox.addEventListener('touchend',function(e){
        currentY = currentY + distanceY;
    })
}