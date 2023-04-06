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

// 帧率
if (window.localStorage.getItem("fpson") == undefined || window.localStorage.getItem("fpson") == "1") {
  var rAF = function () {
      return (
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          function (callback) {
              window.setTimeout(callback, 1000 / 60);
          }
      );
  }();
  var frame = 0;
  var allFrameCount = 0;
  var lastTime = Date.now();
  var lastFameTime = Date.now();
  var loop = function () {
      var now = Date.now();
      var fs = (now - lastFameTime);
      var fps = Math.round(1000 / fs);

      lastFameTime = now;
      // 不置 0，在动画的开头及结尾记录此值的差值算出 FPS
      allFrameCount++;
      frame++;

      if (now > 1000 + lastTime) {
          var fps = Math.round((frame * 1000) / (now - lastTime));
          if (fps <= 5) {
              var kd = `一秒一帧🤢`
          } else if (fps <= 15) {
              var kd = `非常难受😖`
          } else if (fps <= 25) {
              var kd = `较低帧率😨`
          } else if (fps < 35) {
              var kd = `不太流畅🙄`
          } else if (fps <= 45) {
              var kd = `还不错哦😁`
          } else {
              var kd = `十分流畅🤣`
          }
          document.getElementById("fps").innerHTML = `FPS:${fps} ${kd}`;
          frame = 0;
          lastTime = now;
      };

      rAF(loop);
  }

  loop();
} else {
  document.getElementById("fps").style = "display:none!important"
}

var percentFlag = false; // 节流阀
function essayScroll() {
  let a = document.documentElement.scrollTop || window.pageYOffset; // 卷去高度
  const waterfallResult = a % document.documentElement.clientHeight; // 卷去一个视口
  result <= 99 || (result = 99);

  if (
    !percentFlag &&
    waterfallResult + 100 >= document.documentElement.clientHeight &&
    document.querySelector("#waterfall")
  ) {
    // console.info(waterfallResult, document.documentElement.clientHeight);
    setTimeout(() => {
      waterfall("#waterfall");
    }, 500);
  } else {
    setTimeout(() => {
      document.querySelector("#waterfall") && waterfall("#waterfall");
    }, 500);
  }

  const r = window.scrollY + document.documentElement.clientHeight;

  let p = document.getElementById("post-comment") || document.getElementById("footer");

  (p.offsetTop + p.offsetHeight / 2 < r || 90 < result) && (percentFlag = true);
}
function replaceAll(e, n, t) {
  return e.split(n).join(t);
}
var anzhiyu = {
  diffDate: function (d, more = false) {
    const dateNow = new Date();
    const datePost = new Date(d);
    const dateDiff = dateNow.getTime() - datePost.getTime();
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;

    let result;
    if (more) {
      const monthCount = dateDiff / month;
      const dayCount = dateDiff / day;
      const hourCount = dateDiff / hour;
      const minuteCount = dateDiff / minute;

      if (monthCount >= 1) {
        result = datePost.toLocaleDateString().replace(/\//g, "-");
      } else if (dayCount >= 1) {
        result = parseInt(dayCount) + " " + GLOBAL_CONFIG.date_suffix.day;
      } else if (hourCount >= 1) {
        result = parseInt(hourCount) + " " + GLOBAL_CONFIG.date_suffix.hour;
      } else if (minuteCount >= 1) {
        result = parseInt(minuteCount) + " " + GLOBAL_CONFIG.date_suffix.min;
      } else {
        result = GLOBAL_CONFIG.date_suffix.just;
      }
    } else {
      result = parseInt(dateDiff / day);
    }
    return result;
  },
  changeTimeInEssay: function () {
    document.querySelector("#bber") &&
      document.querySelectorAll("#bber time").forEach(function (e) {
        var t = e,
          datetime = t.getAttribute("datetime");
        (t.innerText = anzhiyu.diffDate(datetime, true)), (t.style.display = "inline");
      });
  },
  reflashEssayWaterFall: function () {
    document.querySelector("#waterfall") &&
      setTimeout(function () {
        waterfall("#waterfall");
        document.getElementById("waterfall").classList.add("show");
      }, 500);
  },
  commentText: function (txt) {
    const postCommentDom = document.querySelector("#post-comment");
    var domTop = postCommentDom.offsetTop;
    window.scrollTo(0, domTop - 80);
    if (txt == "undefined" || txt == "null") txt = "好棒！";
    function setText() {
      setTimeout(() => {
        var input = document.getElementsByClassName("el-textarea__inner")[0];
        if (!input) setText();
        let evt = document.createEvent("HTMLEvents");
        evt.initEvent("input", true, true);
        let inputValue = replaceAll(txt, "\n", "\n> ");
        input.value = "> " + inputValue + "\n\n";
        input.dispatchEvent(evt);
        input.focus();
        input.setSelectionRange(-1, -1);
        if (document.getElementById("comment-tips")) {
          document.getElementById("comment-tips").classList.add("show");
        }
      }, 100);
    }
    setText();
  },
  initIndexEssay: function () {
    setTimeout(() => {
      let essay_bar_swiper = new Swiper(".essay_bar_swiper_container", {
        passiveListeners: true,
        direction: "vertical",
        loop: true,
        autoplay: {
          disableOnInteraction: true,
          delay: 3000,
        },
        mousewheel: true,
      });

      let essay_bar_comtainer = document.getElementById("bbtalk");
      if (essay_bar_comtainer !== null) {
        essay_bar_comtainer.onmouseenter = function () {
          essay_bar_swiper.autoplay.stop();
        };
        essay_bar_comtainer.onmouseleave = function () {
          essay_bar_swiper.autoplay.start();
        };
      }
    }, 100);
  },
};

anzhiyu.initIndexEssay();
anzhiyu.changeTimeInEssay();
anzhiyu.reflashEssayWaterFall();

document.addEventListener("copy", function () {
  new Vue({
    data: function () {
        this.$notify({
            title: "复制成功",
            message: "转载请遵守cc协议",
            position: 'top-left',
            offset: 50,
            showClose: true,
            type: "success",
            duration: 4000
        });
    }
  })
})// 检测按键
window.onkeydown = function (e) {
  if (e.keyCode === 123) {
    new Vue({
      data: function () {
          this.$notify({
              title: "开发者模式已打开",
              message: "扒站请遵守GPL协议",
              position: 'top-left',
              offset: 50,
              showClose: true,
              type: "warning",
              duration: 99999999999
          });
      }
    })
  }
}

let heo_cookiesTime = null;
let heo_musicPlaying = false;
let heo_keyboard = false;
let heo_intype = false;
// 私有函数
var heo = {
  // 检测显示模式
  darkModeStatus: function () {
    let theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    if (theme == 'light') {
      $(".menu-darkmode-text").text("深色模式");
    }else {
      $(".menu-darkmode-text").text("浅色模式");
    }
  },

  // 只在首页显示
  onlyHome: function() {
    var urlinfo = window.location.pathname;
    urlinfo = decodeURIComponent(urlinfo);
    if (urlinfo == '/'){
      $('.only-home').attr('style','display: flex');
    }else{
      $('.only-home').attr('style','display: none');
    }
  },

  //是否在首页
  is_Post: function() {
    var url=window.location.href;  //获取url
  if(url.indexOf("/p/") >= 0 ) { //判断url地址中是否包含code字符串
      return true;
    }else {
      return false;
     }
  },


  //监测是否在页面开头
  addNavBackgroundInit: function() {
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
      if(document.body){
        bodyScrollTop = document.body.scrollTop;
      }
      if(document.documentElement){
        documentScrollTop = document.documentElement.scrollTop;
      }
      scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
      // console.log("滚动高度"+ scrollTop)
    
      if (scrollTop != 0) {
        document.getElementById("page-header").classList.add("nav-fixed");
        document.getElementById("page-header").classList.add("nav-visible");
        $('#cookies-window').hide()
        console.log("已添加class")
      }
  },

  // 标签页面
  //分类条
  tagPageActive: function() {
    var urlinfo = window.location.pathname;
    urlinfo = decodeURIComponent(urlinfo)
    // console.log(urlinfo);
    // 验证是否是分类链接
    var pattern = /\/tags\/.*?\//;
    var patbool = pattern.test(urlinfo);
    // console.log(patbool);
    // 获取当前的分类
    if (patbool) {
      var valuegroup = urlinfo.split("/");
      // console.log(valuegroup[2]);
      // 获取当前分类
      var nowCategorie = valuegroup[2];
      if (document.querySelector('#tag-page-tags')){
        $('a').removeClass('select')
        document.getElementById(nowCategorie).classList.add("select");
      }
    }
  },

  //分类条
  categoriesBarActive: function() {
    if (document.querySelector('#category-bar')){
      $(".category-bar-item").removeClass("select")
    }
    var urlinfo = window.location.pathname;
    urlinfo = decodeURIComponent(urlinfo);
    // console.log(urlinfo);
    //判断是否是首页
    if (urlinfo == '/'){
      if (document.querySelector('#category-bar')){
        document.getElementById('category-bar-home').classList.add("select");
      }
    }else {
      // 验证是否是分类链接
      var pattern = /\/categories\/.*?\//;
      var patbool = pattern.test(urlinfo);
      // console.log(patbool);
      // 获取当前的分类
      if (patbool) {
        var valuegroup = urlinfo.split("/");
        // console.log(valuegroup[2]);
        // 获取当前分类
        var nowCategorie = valuegroup[2];
        if (document.querySelector('#category-bar')){
          document.getElementById(nowCategorie).classList.add("select");
        }
      }
    }
  },

  // 页脚友链
  addFriendLinksInFooter: function() {
    var fetchUrl = "https://moments.zhheo.com/randomfriend?num=3"
    fetch(fetchUrl)
    .then(res => res.json())
    .then(json =>{
      var randomFriendLinks = getArrayItems(json,3);
  
      var htmlText = '';
      for (let i = 0; i < randomFriendLinks.length; ++i) {
        var item = randomFriendLinks[i]
        htmlText += `<a class='footer-item' href='${item.link}'  target="_blank" rel="noopener nofollow">${item.name}</a>`;
      }
      htmlText += `<a class='footer-item' href='/link/'>更多</a>`
      document.getElementById("friend-links-in-footer").innerHTML = htmlText;
    })
  },

  //禁止图片右键单击
  stopImgRightDrag: function() {
    var img=$("img");
    img.on("dragstart",function(){return false;});
  },

  //置顶文章横向滚动
  topPostScroll: function() {
    if (document.getElementById("recent-post-item")){
      let xscroll = document.getElementById("recent-post-item");
      xscroll.addEventListener("mousewheel", function (e) {
      //计算鼠标滚轮滚动的距离
      let v = -e.wheelDelta / 2;
      xscroll.scrollLeft += v;
      //阻止浏览器默认方法
        e.preventDefault();
      }, false);
    }
  },

  topCategoriesBarScroll: function() {
    if (document.getElementById("category-bar-items")){
        let xscroll = document.getElementById("category-bar-items");
        xscroll.addEventListener("mousewheel", function (e) {
        //计算鼠标滚轮滚动的距离
        let v = -e.wheelDelta / 2;
        xscroll.scrollLeft += v;
        //阻止浏览器默认方法
        e.preventDefault();
      }, false);
    }
  },

  //作者卡片问好
  sayhi: function() {
    if (document.querySelector('#author-info__sayhi')){
      document.getElementById("author-info__sayhi").innerHTML = getTimeState() + "！我是";
    }
  },

  // 添加标签
  addTag: function() {
    //添加new标签
    if (document.querySelector('.heo-tag-new')){
      $(".heo-tag-new").append(`<sup class="heo-tag heo-tag-new-view">N</sup>`)
    }
    //添加hot标签
    if (document.querySelector('.heo-tag-hot')){
      $(".heo-tag-hot").append(`<sup class="heo-tag heo-tag-hot-view">H</sup>`)
    }
  },

  // 二维码
  qrcodeCreate: function() {
    if (document.getElementById('qrcode')){
      document.getElementById("qrcode").innerHTML = "";
      var qrcode = new QRCode(document.getElementById("qrcode"), {
        text: window.location.href,
        width: 250,
        height: 250,
        colorDark : "#000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
      });
    }
  },

  // 刷新即刻短文瀑布流
  reflashEssayWaterFall: function() {
    if (document.querySelector('#waterfall')) {
      setTimeout(function(){
          waterfall('#waterfall');
          document.getElementById("waterfall").classList.add('show'); 
      },500);
    }
  },

  // 即刻短文添加灯箱
  addMediumInEssay: function() {
    if (document.querySelector('#waterfall')) {
      mediumZoom(document.querySelectorAll('[data-zoomable]'))
    }
  },

  // 下载图片
  downloadImage: function(imgsrc, name) { //下载图片地址和图片名
    rm.hideRightMenu();
    if (rm.downloadimging == false) {
      rm.downloadimging = true;
      btf.snackbarShow('正在下载中，请稍后',false,10000)
      setTimeout(function(){
        let image = new Image();
        // 解决跨域 Canvas 污染问题
        image.setAttribute("crossOrigin", "anonymous");
        image.onload = function() {
          let canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          let context = canvas.getContext("2d");
          context.drawImage(image, 0, 0, image.width, image.height);
          let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
          let a = document.createElement("a"); // 生成一个a元素
          let event = new MouseEvent("click"); // 创建一个单击事件
          a.download = name || "photo"; // 设置图片名称
          a.href = url; // 将生成的URL设置为a.href属性
          a.dispatchEvent(event); // 触发a的单击事件
        };
        image.src = imgsrc;
        btf.snackbarShow('图片已添加盲水印，请遵守版权协议');
        rm.downloadimging = false;
      }, "10000");
    }else{
      btf.snackbarShow('有正在进行中的下载，请稍后再试');
    }
  },

  //控制评论弹幕
  switchCommentBarrage: function() {
    let commentBarrage = document.querySelector('.comment-barrage');
    if(commentBarrage){
        if($(".comment-barrage").is(":visible")) {
          $(".comment-barrage").hide();
          $(".menu-commentBarrage-text").text("显示热评");
          document.querySelector("#consoleCommentBarrage").classList.remove("on");
          localStorage.setItem('commentBarrageSwitch', 'false');
        }else if ($(".comment-barrage").is(":hidden")) {
          $(".comment-barrage").show();
          $(".menu-commentBarrage-text").text("关闭热评");
          document.querySelector("#consoleCommentBarrage").classList.add("on");
          localStorage.removeItem('commentBarrageSwitch');
        }
    }
    rm.hideRightMenu();
  },

  //隐藏cookie窗口
  hidecookie: function() {
    heo_cookiesTime = setTimeout(()=>{
      document.getElementById("cookies-window").classList.add('cw-hide');
      setTimeout(()=>{
        $('#cookies-window').hide()
      },1000)
    },3000)
  },

  //隐藏今日推荐
  hideTodayCard: function() {
    if (document.getElementById("todayCard")) {
      document.getElementById("todayCard").classList.add('hide');
    }
  },

  //更改主题色
  changeThemeColor: function(color) {
    if (document.querySelector('meta[name="theme-color"]') !== null) {
      document.querySelector('meta[name="theme-color"]').setAttribute('content', color)
    }
  },

  //自适应主题色
  initThemeColor: function() {
    if (heo.is_Post()) {
      const currentTop = window.scrollY || document.documentElement.scrollTop
      if (currentTop > 56) {
        let themeColor = getComputedStyle(document.documentElement).getPropertyValue('--heo-background');
        heo.changeThemeColor(themeColor);
      }else {
        if (currentTop === 0) {
          let themeColor = getComputedStyle(document.documentElement).getPropertyValue('--heo-main');
          heo.changeThemeColor(themeColor);
        }
      }
    }else {
      let themeColor = getComputedStyle(document.documentElement).getPropertyValue('--heo-background');
      heo.changeThemeColor(themeColor);
    }
  },

  //跳转到指定位置
  jumpTo: function(dom) {
    $(document).ready(function () {
      $("html,body").animate({
        scrollTop: $(dom).eq(i).offset().top
      }, 500 /*scroll实现定位滚动*/ ); /*让整个页面可以滚动*/
    });
  },

  //显示加载动画
  showLoading: function() {
    document.querySelector("#loading-box").classList.remove("loaded");
    let cardColor = getComputedStyle(document.documentElement).getPropertyValue('--heo-card-bg');
    heo.changeThemeColor(cardColor);
  },

  //隐藏加载动画
  hideLoading: function() {
    document.querySelector("#loading-box").classList.add("loaded");
  },

  //切换音乐播放状态
  musicToggle: function() {
    let msgPlay = '<i class="fa-solid fa-play"></i><span>播放音乐</span>' // 此處可以更改為你想要顯示的文字
    let msgPause = '<i class="fa-solid fa-pause"></i><span>暂停音乐</span>' // 同上，但兩處均不建議更改
    if (heo_musicPlaying) {
      document.querySelector("#nav-music").classList.remove("playing");
      document.getElementById("menu-music-toggle").innerHTML = msgPlay;
      document.getElementById("nav-music-hoverTips").innerHTML = "音乐已暂停";
      document.querySelector("#consoleMusic").classList.remove("on");
      heo_musicPlaying = false;
    }else {
      document.querySelector("#nav-music").classList.add("playing");
      document.getElementById("menu-music-toggle").innerHTML = msgPause;
      document.querySelector("#consoleMusic").classList.add("on");
      heo_musicPlaying = true;
    }
    document.querySelector('meting-js').aplayer.toggle();
    rm.hideRightMenu();
  },

  //音乐上一曲
  musicSkipBack: function() {
    document.querySelector('meting-js').aplayer.skipBack();
    rm.hideRightMenu();
  },

  //音乐下一曲
  musicSkipForward: function() {
    document.querySelector('meting-js').aplayer.skipForward();
    rm.hideRightMenu();
  },

  //获取音乐中的名称
  musicGetName: function() {
    var x = $('.aplayer-title')
		// var x = document.getElementsByClassName('txt');
		// for (var i = x.length - 1; i >= 0; i--) {
		// console.log(x[i].innerText)
		// }
		var arr = []
		for (var i = x.length - 1; i >= 0; i--) {
			arr[i] = x[i].innerText
			// console.log(x[i].innerText)
		}
		return arr[0]
  },

  //显示中控台
  showConsole: function() {
    document.querySelector("#console").classList.add("show");
    heo.initConsoleState();
  },

  //隐藏中控台
  hideConsole: function() {
    document.querySelector("#console").classList.remove("show");
  },

  //快捷键功能开关
  keyboardToggle: function() {
    if (heo_keyboard) {
      heo_keyboard = false;
      document.querySelector("#consoleKeyboard").classList.remove("on");
      localStorage.setItem('keyboardToggle', 'false');
    }else {
      heo_keyboard = true;
      document.querySelector("#consoleKeyboard").classList.add("on");
      localStorage.setItem('keyboardToggle', 'true');
    }
  },

  //滚动到指定id
  scrollTo:function(id){
    var domTop = document.querySelector(id).offsetTop;
    window.scrollTo(0,domTop - 80);
  },

  //隐藏侧边栏
  hideAsideBtn: () => { // Hide aside
    const $htmlDom = document.documentElement.classList
    $htmlDom.contains('hide-aside')
      ? saveToLocal.set('aside-status', 'show', 2)
      : saveToLocal.set('aside-status', 'hide', 2)
    $htmlDom.toggle('hide-aside')
    $htmlDom.contains('hide-aside')
      ? document.querySelector("#consoleHideAside").classList.add("on")
      : document.querySelector("#consoleHideAside").classList.remove("on")
  },

  //初始化console图标
  initConsoleState: function() {
    //初始化隐藏边栏
    const $htmlDom = document.documentElement.classList
    $htmlDom.contains('hide-aside')
      ? document.querySelector("#consoleHideAside").classList.add("on")
      : document.querySelector("#consoleHideAside").classList.remove("on")
  },

  //删除多余的class
  removeBodyPaceClass: function() {
    $('body').removeClass()
    $('body').addClass('pace-done')
  }
}

  // 右键菜单添加点击事件
  $('#menu-backward').on('click',function(){window.history.back();rm.hideRightMenu();});
  $('#menu-forward').on('click',function(){window.history.forward();rm.hideRightMenu();});
  $('#menu-refresh').on('click',function(){window.location.reload();});
  $('#menu-top').on('click',function(){btf.scrollToDest(0, 500);rm.hideRightMenu();});
  $('.menu-link').on('click',rm.hideRightMenu);

  $("#menu-darkmode").prop("onclick",null).off("click");
  $('#menu-darkmode').on('click',rm.switchDarkMode);

  $('#menu-home').on('click',function(){window.location.href = window.location.origin;});
  $('#menu-randomPost').on('click',function(){toRandomPost()});

  $("#menu-commentBarrage").prop("onclick",null).off("click");
  $('#menu-commentBarrage').on('click',heo.switchCommentBarrage);

  $('#rightmenu-mask').on('click',rm.hideRightMenu);
  $('#rightmenu-mask').contextmenu(function(){
    rm.hideRightMenu();
    return false;
  });
  $('#menu-translate').on('click',function(){
      rm.hideRightMenu();
      translateInitialization();
  });
  $('#menu-copy').on('click', rm.copyPageUrl);
  $('#menu-pastetext').on('click',rm.pasteText);
  $('#menu-copytext').on('click',function(){rm.rightmenuCopyText(selectTextNow);btf.snackbarShow('复制成功，复制和转载请标注本文地址');});
  $('#menu-commenttext').on('click',function(){rm.rightMenuCommentText(selectTextNow);});
  $('#menu-newwindow').on('click',function(){window.open(domhref);rm.hideRightMenu();});
  $('#menu-copylink').on('click',rm.copyLink);
  $('#menu-downloadimg').on('click',function(){heo.downloadImage(domImgSrc,'zhheo');});
  $('#menu-copyimg').on('click',function(){rm.writeClipImg(domImgSrc);});
  $('#menu-searchBaidu').on('click',rm.searchBaidu);

