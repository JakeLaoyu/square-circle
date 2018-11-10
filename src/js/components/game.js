/**
 * 画图页面js
 * @Author: Jake
 * @Date:   2017-09-13T16:43:19+08:00
 * @Email:  yucj@dxy.cn
 * @Last modified by:   Jake
 * @Last modified time: 2017-09-30T16:56:56+08:00
 */

var Hammer = require('hammerjs')
var canvas = require('./canvas')
var circle = require('./circle')
var square = require('./square')
var score = require('./score')
var loading = require('./loading')
var base64 = require('js-base64').Base64

exports.game = function() {
  $('.start').addClass('animated fadeOut').one('animationend', function() {
    $(this).addClass('hide')

    showGamePage()
  });
}

function showGamePage() {
  $('.game').removeClass('hide')

  setTimeout(function() {
    $('.game__yueliang,.game__yuebing').animate({
      'opacity': 1
    }, 1000)

    setTimeout(function() {
      $('.game__dot').removeClass('hide').animateCssEnd('flash')

      $('.canvas').removeClass('hide').attr({
        'width': $('.game').width(),
        'height': $('.game').height()
      })

      // 初始化
      canvas.init()

    }, 1000)
  }, 1000)
}

/**
 * 重新开始游戏
 * @return {[type]} [description]
 */
exports.reGame = function() {
  $('.game__dot').addClass('hide')
  $('.canvas').addClass('hide')
  $('.game__yuebing,.game__yueliang').css('opacity', 0)
  $('div.rank,div.score').addClass('hide')

  canvas.clearData()
  $('*').removeClass('animated fadeOut')
  $('.score__90,.score__80,.score__70').addClass('hide')
  showGamePage()
}

/**
 * 计算分数
 * @param  {[type]} arr 坐标数组
 * @return {[type]}     [description]
 */
exports.calculation = function(arr, startTime, endTime) {
  // 计算圆形误差
  var circleCount = circle(arr.one[0].pageX < arr.two[0].pageX ? arr.one : arr.two)
  var squareCount = square(arr.one[0].pageX > arr.two[0].pageX ? arr.one : arr.two)


  // 分数
  var fraction = 100 - (circleCount + squareCount) / 2


  loading.ajaxLoading()
  $.ajax({
    url: '/services/midautumn/do/game',
    type: 'POST',
    data: {
      score: strencode(String(fraction) + '+' + String((endTime - startTime) / 1000)),
      time: (endTime - startTime) / 1000
    },
    dataType: "JSON",
    success: function(data) {
      if (!data.success) {
        alert('速度太快，请稍后重试。')
        return location.reload()
      }
      loading.removeAjaxLoading()
      score.showScorePage(fraction)
    }
  })
}


/**
 * 加密代码
 * @param  {[type]} strings [description]
 * @return {[type]}         [description]
 */
function strencode(strings) {
  var key = 'e10adc3949ba59abbe56e057f20f883e';
  var strings = base64.encode(strings);
  var len = key.length;
  var code = '';
  for (var i = 0; i < strings.length; i++) {
    var k = i % len;
    code += String.fromCharCode(strings.charCodeAt(i) ^ key.charCodeAt(k));
  }
  return base64.encode(code);
}


/**
 * 计算两点之间的距离
 * @param  {[type]} point1 [description]
 * @param  {[type]} point2 [description]
 * @return {[type]}        [description]
 */
exports.pointsDistance = function(point1, point2) {
  return Math.sqrt(Math.pow((point2.pageX - point1.pageX), 2) + Math.pow((point2.pageY - point1.pageY), 2))
}
