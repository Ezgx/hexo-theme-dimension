//标题
var OriginTitile = document.title;    // 保存之前页面标题
var titleTime;
document.addEventListener('visibilitychange', function(){
    if (document.hidden){
        document.title = '404 Not Found';
        clearTimeout(titleTime);
    }else{
        document.title = '上当了吧哈哈！';
        titleTime = setTimeout(function() {
            document.title = OriginTitile;
        }, 3000); // 3秒后恢复原标题
    }
});