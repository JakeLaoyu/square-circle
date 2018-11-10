/**
 * @Author: Jake
 * @Date:   2017-09-18T16:40:04+08:00
 * @Email:  yucj@dxy.cn
 * @Last modified by:   Jake
 * @Last modified time: 2017-09-27T09:42:50+08:00
 */


exports.init = () => {
  // 背景音乐控制
  var audio = document.getElementById("bgMusic");
  audio.play();
  document.addEventListener("WeixinJSBridgeReady", function() {
    audio.play();
  }, false);
  $('.bgMusicControl').click(function() {
    var _ = $(this)
    if (_.hasClass('play')) {
      audio.pause();
      _.removeClass('play').addClass('pause')
      _.removeClass('rotate')
    } else {
      audio.play();
      _.removeClass('pause').addClass('play')
      _.addClass('rotate')
    }
  })
}
