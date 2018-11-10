/**
 * canvas画图形
 * @Author: Jake
 * @Date:   2017-09-13T23:14:55+08:00
 * @Email:  yucj@dxy.cn
 * @Last modified by:   Jake
 * @Last modified time: 2017-09-30T13:59:27+08:00
 */

var circle = require('./circle')
var game = require('./game')

var ongoingTouches = [];
var prompt; //保存提示定时器
var endCount = 0; //触发end计数
var allTouches = {
  one: new Array(),
  two: new Array()
} //存储触摸数据，用于计算分数

var startTime, endTime;

/**
 * 清除数据，重新开始
 * @return {[type]} [description]
 */
function clearData() {
  ongoingTouches = [];
  clearPrompt()
  endCount = 0; //触发end计数
  allTouches = {
    one: new Array(),
    two: new Array()
  } //存储触摸数据，用于计算分数

  startTime = ''
  endTime = ''

  $('.canvas').unbind()
  var el = document.getElementsByTagName("canvas")[0];
  var ctx = el.getContext("2d");
  ctx.clearRect(0, 0, $('.canvas').width(), $('.canvas').height())
}

/**
 * 清除提示定时器
 * @return {[type]} [description]
 */
function clearPrompt() {
  if (prompt) {
    // 清除定时器
    clearTimeout(prompt)
    prompt = ''
    $('.game__prompt').addClass('hide')
  }
}

/**
 * 设置提示定时器
 * @return {[type]} [description]
 */
function setPrompt() {
  if (!prompt) {
    prompt = setTimeout(function() {
      $('.game__prompt').removeClass('hide').animateCssEnd('flash')
    }, 1000)
  }
}

/**
 * 将移动坐标插入 allTouches
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
function allTouchesAdd(arr) {
  if (allTouches.one.length == 0 || arr.identifier == allTouches.one[0].identifier) {
    allTouches.one.push(arr)
  } else if (allTouches.two.length == 0 || arr.identifier == allTouches.two[0].identifier) {
    allTouches.two.push(arr)
  }
}

/**
 * 绑定事件
 * @return {[type]} [description]
 */
function init() {
  var el = document.getElementsByTagName("canvas")[0];
  el.addEventListener("touchstart", handleStart, false);
  el.addEventListener("touchmove", handleMove, false);
  el.addEventListener("touchend", handleEnd, false);
}

/**
 * touchstart函数
 * @param  {[type]} evt [description]
 * @return {[type]}     [description]
 */
function handleStart(evt) {
  evt.preventDefault();
  var el = document.getElementsByTagName("canvas")[0];
  var ctx = el.getContext("2d");
  var touches = evt.changedTouches;


  for (var i = 0; i < touches.length; i++) {
    ongoingTouches.push(touches[i]);
    var color = colorForTouch(touches[i]);
    ctx.fillStyle = color;
    ctx.fillRect(touches[i].pageX - 2, touches[i].pageY - 2, 4, 4);
  }
}


/**
 * touchmove函数
 * @param  {[type]} evt [description]
 * @return {[type]}     [description]
 */
function handleMove(evt) {
  evt.preventDefault();
  var el = document.getElementsByTagName("canvas")[0];
  var ctx = el.getContext("2d");
  var touches = evt.changedTouches;

  ctx.lineWidth = 4;

  // 当两手指同时移动时
  if (touches.length == 2) {
    if (!startTime) {
      startTime = Date.now()
    }

    clearPrompt()

    for (var i = 0; i < touches.length; i++) {
      var color = colorForTouch(touches[i]);
      var idx = ongoingTouchIndexById(touches[i].identifier);
      allTouchesAdd(touches[i])

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
      ctx.lineTo(touches[i].pageX, touches[i].pageY);
      ctx.closePath();
      ctx.stroke();
      ongoingTouches.splice(idx, 1, touches[i]); // swap in the new touch record
    }
  } else {
    setPrompt()
  }
}

/**
 * touchend 函数
 * @param  {[type]} evt [description]
 * @return {[type]}     [description]
 */
function handleEnd(evt) {
  evt.preventDefault();
  console.info('触发end')

  endCount++

  var el = document.getElementsByTagName("canvas")[0];
  var ctx = el.getContext("2d");
  var touches = evt.changedTouches;
  ctx.lineWidth = 4;

  for (var i = 0; i < touches.length; i++) {
    var color = colorForTouch(touches[i]);
    var idx = ongoingTouchIndexById(touches[i].identifier);

    ctx.fillStyle = color;
    ctx.beginPath();
    if (ongoingTouches[i]) {
      ctx.moveTo(ongoingTouches[i].pageX, ongoingTouches[i].pageY);
      ctx.lineTo(touches[i].pageX, touches[i].pageY);
      ongoingTouches.splice(i, 1); // remove it; we're done
    }
  }

  // 传递给计算函数
  if (allTouches.one.length > 0 && allTouches.two.length > 0) {
    if (!endTime) {
      endTime = Date.now()
    }
    game.calculation(allTouches, startTime, endTime)
  }

}

/**
 * 触摸取消
 * @param  {[type]} evt [description]
 * @return {[type]}     [description]
 */
function handleCancel(evt) {
  evt.preventDefault();
  var touches = evt.changedTouches;

  for (var i = 0; i < touches.length; i++) {
    ongoingTouches.splice(i, 1); // remove it; we're done
  }
}

function colorForTouch(touch) {
  var id = touch.identifier;
  id = id.toString(16); // make it a hex digit
  return "#" + id + id + id;
}

/**
 * 查询正在进行的触摸行为
 * @param  {[type]} idToFind identifier
 * @return {[type]}          返回这个触摸行为在数组中的下标。
 */
function ongoingTouchIndexById(idToFind) {
  for (var i = 0; i < ongoingTouches.length; i++) {
    var id = ongoingTouches[i].identifier;

    if (id == idToFind) {
      return i;
    }
  }
  return -1; // not found
}

exports.init = init
exports.clearData = clearData
