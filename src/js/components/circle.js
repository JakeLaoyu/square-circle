/**
 * 计算圆形误差
 * @Author: Jake
 * @Date:   2017-09-14T15:41:03+08:00
 * @Email:  yucj@dxy.cn
 * @Last modified by:   Jake
 * @Last modified time: 2017-09-30T13:58:33+08:00
 */

var other = require('./other')
var game = require('./game')

function circle(arr) {

  if (game.pointsDistance(arr[0], arr[arr.length - 1]) > 50 || arr.length < 150) {
    return other.randomNum(20, 40)
  }

  var r = $('.game__yueliang').width() / 2
  var cx = $('.game__yueliang').offset().left + r
  var cy = $('.game__yueliang').offset().top + r
  var circleCenter = {
    pageX: cx,
    pageY: cy
  }

  var count = 0;
  for (let i = 0; i < arr.length; i++) {
    count += Math.abs(game.pointsDistance(arr[i], circleCenter) - r)
  }

  return count / arr.length
}

module.exports = circle
