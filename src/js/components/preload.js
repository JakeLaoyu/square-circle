/**
 * @Author: Jake
 * @Date:   2017-09-13T11:06:42+08:00
 * @Email:  yucj@dxy.cn
 * @Last modified by:   Jake
 * @Last modified time: 2017-09-27T14:29:48+08:00
 */

// 图片预加载
var images = new Array()

var preloadArr = []

for (var i = 0; i < 10; i++) {
  preloadArr.push(i + '.png')

  if (i < 4) {
    preloadArr.push('rank-' + (i + 1) + '.png')
  }

  preloadArr.push('btn-touch.png')
}


module.exports = () => {
  for (var i = 0; i < preloadArr.length; i++) {
    images[i] = new Image()
    images[i].src = window.rootpath + preloadArr[i]
  }
}
