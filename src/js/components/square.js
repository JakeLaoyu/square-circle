/**
 * 正方形分数计算
 * @Author: Jake
 * @Date:   2017-09-14T19:06:07+08:00
 * @Email:  yucj@dxy.cn
 * @Last modified by:   Jake
 * @Last modified time: 2017-09-18T18:40:26+08:00
 */

var other = require('./other')
var game = require('./game')

var squareX = [] //保存图片x轴
var squareY = [] //保存图片x轴

function square(arr) {
  initXY()
  var count = 0
  if (game.pointsDistance(arr[0], arr[arr.length - 1]) > 50 || arr.length < 150) {
    return other.randomNum(20, 40)
  }
  for (let i = 0; i < arr.length; i++) {
    count += getMinDis(arr[i])
  }
  return count / arr.length
}

/**
 * 初始化原图形X、Y轴
 * @return {[type]} [description]
 */
function initXY() {
  var squareLeft = $('.game__yuebing').offset().left
  var squareTop = $('.game__yuebing').offset().top
  var squareW = $('.game__yuebing').width()
  var squareH = $('.game__yuebing').height()
  squareX.push(squareLeft)
  squareX.push(squareLeft + squareW)

  squareY.push(squareTop)
  squareY.push(squareTop + squareH)
}


/**
 * 获取每个坐标距离 方形边框的最小距离
 * @param  {[type]}  point 移动坐标信息
 * @return {Boolean}       [description]
 */
function getMinDis(point) {
  var x1 = Math.abs(point.pageX - squareX[0])
  var x2 = Math.abs(point.pageX - squareX[1])
  var y1 = Math.abs(point.pageY - squareY[0])
  var y2 = Math.abs(point.pageY - squareY[1])
  var minX = x1 < x2 ? x1 : x2
  var minY = y1 < y2 ? y1 : y2

  return minX < minY ? minX : minY
}



module.exports = square
