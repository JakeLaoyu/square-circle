/**
 * @Author: Jake
 * @Date:   2017-09-18T09:38:01+08:00
 * @Email:  yucj@dxy.cn
 * @Last modified by:   Jake
 * @Last modified time: 2017-09-27T13:19:00+08:00
 */

var game = require('./game')

exports.showRank = function() {
  $('.rank__again').unbind().click(function() {
    ga('send', 'event', '中秋节H5 + 排行榜页面再玩一次'); /** 统计用户行为 **/
    game.reGame()
  })

  $('.rank__share').unbind().click(function() {
    $('body>.share').removeClass('hide')
  })

  $('body>.share').unbind().click(function(e) {
    e.stopPropagation()
    $('body>.share').addClass('hide')
  })

  $('div.score').addClass('hide')

  $('.rank').removeClass('hide')
}
