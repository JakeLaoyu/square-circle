/**
 * @Author: Jake
 * @Date:   2017-09-13T15:23:06+08:00
 * @Email:  yucj@dxy.cn
 * @Last modified by:   Jake
 * @Last modified time: 2017-09-30T14:43:46+08:00
 */

//打字机插件
var Typed = require('typed.js')
var preload = require('./preload')
var game = require('./game')
var loading = require('./loading')


exports.startShow = function() {
  window.onload = function() {
    loading.remove(+Date.now(), function() {

      $('.start').removeClass('hide')
      // $('div.score').removeClass('hide')

      var startText = '来试试！你是快准稳还是满错乱？'
      var typed = new Typed(".typed__start", {
        strings: ["来试试！你是快准稳还是满错乱？"],
        typeSpeed: 40
      });

      $('.zqj').removeClass('hide').animateCss('fadeInDown')
      $('.wxhn').removeClass('hide').animateCss('fadeInLeft')

      // 首页按钮touch
      $('.start .btn').bind('touchstart', function() {
        $(this).css('background-image', 'url(http://assets.dxycdn.com/templates/2017/mid-autumn-festival/dist/images/btn-touch.png)')
      })
      $('.start .btn').bind('touchend', function() {
        $(this).css('background-image', 'url(http://assets.dxycdn.com/templates/2017/mid-autumn-festival/dist/images/btn.png)')
      })
      $('.start .btn').bind('click', function() {
        game.game()

      })
    })

  }
}
