linksBarActive()
toplinksBarScroll()

//分类条
function linksBarActive(){
  var urlinfo = window.location.pathname;
  urlinfo = decodeURIComponent(urlinfo)
  console.log(urlinfo);
  }

//鼠标控制横向滚动
function toplinksBarScroll(){
  if (document.getElementById("links-bar-items")){
    let xscroll = document.getElementById("links-bar-items");
  xscroll.addEventListener("mousewheel", function (e) {
    //计算鼠标滚轮滚动的距离
    let v = -e.wheelDelta / 2;
    xscroll.scrollLeft += v;
    //阻止浏览器默认方法
    e.preventDefault();
}, false);
  }
}