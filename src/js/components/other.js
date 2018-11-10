/**
 * @Author: Jake
 * @Date:   2017-09-14T15:45:25+08:00
 * @Email:  yucj@dxy.cn
 * @Last modified by:   Jake
 * @Last modified time: 2017-09-18T16:02:51+08:00
 */

/**
 * 在两个数之间取随机数
 * @param  {[type]} minNum 最小值
 * @param  {[type]} maxNum 最大值
 * @return {[type]}        随机数
 */
exports.randomNum = (minNum, maxNum) => {
  var nums = maxNum - minNum + 1;
  var num = Math.floor(Math.random() * nums + minNum);
  return num;
}


function phone() {
  $('.orientation__phone').addClass('transform')
  setTimeout(function() {
    $('.orientation__phone').removeClass('transform')
    setTimeout(phone, 2000)
  }, 2000)
}

exports.phone = phone
