/**
 * @Author: Jake
 * @Date:   2017-09-19T09:34:14+08:00
 * @Email:  yucj@dxy.cn
 * @Last modified by:   Jake
 * @Last modified time: 2017-09-30T13:59:02+08:00
 */

var scheduleInterval;
var schedule = 1
var startTime


exports.loading = () => {
  $(function() {
    startTime = +new Date()
    scheduleInterval = setInterval(function() {
      if (schedule < 99) {
        schedule++
        loadingGo(schedule)
      }
    }, 50)
  })
}

exports.remove = (endtime, cb) => {
  var timeout = endtime - startTime >= 1000 ? 0 : (1000 - (endtime - startTime))

  setTimeout(function() {
    clearInterval(scheduleInterval)
    schedule = 100
    loadingGo(100)

    setTimeout(function() {
      $('.loading').remove()
      cb()
    }, 500)

  }, timeout)

}

exports.ajaxLoading = () => {
  var dom = $(`<div class="ajax-loading start-main-wrap" style="z-index:999;">
              <div class="inner">
                <i class="float"></i>
                <div class="text">交卷打分中~~</div>
              </div>
            </div>`)
  $('body').append(dom)
}

exports.removeAjaxLoading = () => {
  $('.ajax-loading').remove()
}


function loadingGo(num) {
  $('.loading__percentage').html(num + '%')
  $('.loading__schedule-inner').width(num + '%')
  $('.loading__pen').css('padding-left', num + "%")
}
