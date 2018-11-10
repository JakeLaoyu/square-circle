/**
 * 显示得分
 * @Author: Jake
 * @Date:   2017-09-15T13:50:41+08:00
 * @Email:  yucj@dxy.cn
 * @Last modified by:   Jake
 * @Last modified time: 2017-09-30T13:59:19+08:00
 */

var rank = require('./rank')
var loading = require('./loading')
var game = require('./game')

exports.showScorePage = function(score) {

  // score = 59
  var scoreArr = String(score.toFixed(1)).split('')

  $('.score__ten').attr('src', window.rootpath + scoreArr[0] + '.png')
  $('.score__bit').attr('src', window.rootpath + scoreArr[1] + '.png')
  $('.score__decimal').attr('src', window.rootpath + scoreArr[3] + '.png')


  if (score >= 90) {
    $('.score__90').removeClass('hide')
  } else if (score >= 80) {
    $('.score__80').removeClass('hide')
  } else {
    $('.score__70').removeClass('hide')
  }


  $('.score__again').unbind().click(function() {
    ga('send', 'event', '中秋节H5+得分页再玩一次'); /** 统计用户行为 **/

    game.reGame()
  })

  $('.score__ranking').unbind().click(function() {
    ga('send', 'event', '中秋节H5 + 得分页 查看排名'); /** 统计用户行为 **/
    loading.ajaxLoading()
    $.ajax({
      url: '/services/midautumn/do/rank',
      type: 'GET',
      dataType: "JSON",
      success: function(res) {
        if (res.success) {
          $('.rank__me-line1 .no').html('NO.' + res.data.myRank)
          $('.rank__me-line2 .text').html(res.data.myData.score + '分')
          $('.rank__me-line2 .time').html(res.data.myData.time + '秒')
          $('.rank__me-av').attr('src', res.data.myData.avatar)
          $('.rank__list').html('')

          res.data.rankList.forEach(function(item, index) {

            var _ = $(`<div class="rank__item">
                      <div class="rank__num"></div>
                      <img src="//assets.dxycdn.com/templates/2017/mid-autumn-festival/dist/images/rank-4.png" class="rank__bg">
                      <img src="" class="rank__avatar">
                      <div class="rank__name"></div>

                      <div class="rank__score">
                          <span class="score"><span></span>分</span>
                          <span class="time"><span></span>秒</span>
                      </div>
                  </div>`)

            _.addClass('rank__' + (index + 1))
              .find('.rank__num').html(index + 1)

            if (index < 3) {
              _.find('.rank__bg').attr('src', rootpath + 'rank-' + (index + 1) + '.png')
            }

            _.find('.rank__avatar').attr('src', item.avatar)
            _.find('.rank__name').html(item.name)
            _.find('.score span').html(item.score)
            _.find('.time span').html(item.time)

            $('.rank__list').append(_)
          })

          loading.removeAjaxLoading()
          rank.showRank()

        } else {
          alert(res.message)
          window.location.reload()
        }
      }
    })
  })

  $('.game').addClass('animated fadeOut').one('animationend', function() {
    $(this).addClass('hide')
    $('.score').removeClass('hide')

  })
}
