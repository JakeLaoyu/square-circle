//通过webpack.config.js里配置alias引用jquery
const $ = require('jquery');
window.$ = $
window.rootpath = '//assets.dxycdn.com/templates/2017/mid-autumn-festival/dist/images/'

window.isMobile = /mobile/i.test(window.navigator.userAgent);
window.isIE8 = /MSIE 8.0/i.test(window.navigator.userAgent);
window.isWeixin = /micromessenger/.test(navigator.userAgent.toLowerCase())

let dxy_wechat_share = require('dxy-wechat-share');
var load = require('./components/loading')
var start = require('./components/start')
var other = require('./components/other')
var music = require('./components/music')
var preload = require('./components/preload')

var screenHeight = window.screen.availHeight
var screenWidth = window.screen.availWidth
var remWidth = screenWidth > screenHeight ? screenWidth : screenHeight
var html = document.getElementsByTagName("html");
html[0].style.fontSize = remWidth / 10 + "px";


load.loading()

// 监听是否横屏
if (window.orientation == 0) {
  $('.orientation').removeClass('hide')
}

// 手机旋转
other.phone()

window.addEventListener("orientationchange", function() {
  if (window.orientation == 0) {
    $('.orientation').removeClass('hide')
  } else {
    $('.orientation').addClass('hide')
  }
});



$(function($) {
  // 阻止微信橡皮筋效果
  document.addEventListener('touchmove', function preventDefault(ev) {
    ev.preventDefault()
  }, false)

  $('.rank__list').on('touchmove', function(e) {
    e.stopPropagation()
  })

  music.init()

  //增加全局方法
  //animateCss，配合animate.css，使动画结束后移除动画class
  $.fn.extend({
    animateCss: function(animationName) {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      $(this).addClass('animated ' + animationName).one(animationEnd, function() {
        $(this).removeClass('animated ' + animationName);
      });
    },
    // 动画执行结束后渐隐
    animateCssEnd: function(animationName) {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      $(this).addClass('animated ' + animationName).one(animationEnd, function() {
        var _ = $(this)
        _.removeClass('animated ' + animationName)
        _.animateCssFadeOut()
      });
    },
    animateCssFadeOut: function() {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      $(this).addClass('animated fadeOut').one(animationEnd, function() {
        $(this).addClass('hide')
      });
    }
  });
  window.wx_share = 'https://sim.dxy.cn/japi/js/sign/77?callback=?';
  dxy_wechat_share({
    title: '中秋节我要和你OO口口',
    desc: '左手右手一个快动作，购物卡就是你的了！',
    imgUrl: 'https://assets.dxycdn.com/templates/2017/mid-autumn-festival/dist/images/200x200.jpg',
    success: function() {
      ga('send', 'event', '中秋节H5 + 分享');
    }
  });


  start.startShow()

  preload()
})
