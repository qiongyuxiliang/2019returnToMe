var ul = document.querySelector('#ul');
var fix = document.querySelector('#fix');
var con = document.querySelector('#container')
var first, last, lastT, firstT;
function LongScrollList(opt) {
  this.dataSource = opt.dataSource;
  this.startIndex = 0;
  this.size = opt.size;
  this.scrollTop = 0;
  this.height = opt.height;
  this.perHeight = opt.perHeight;
  this.tempHeight = opt.tempHeight;//向上滑动使用
  this.tempHeight1 = opt.tempHeight;
  this.finished = true;
  this.scrollDownState = true;
}
LongScrollList.prototype.scrollDown = function () {

  var currentSize = this.size * 2 - 1 >= document.querySelectorAll('li').length - 1 ? document.querySelectorAll('li').length - 1 : this.size * 2 - 1;
  if (this.startIndex >= (this.dataSource.ex_list.length - this.size * 2 - 1)) {
    return;
  }
  last = document.querySelectorAll('li')[currentSize].getBoundingClientRect();
  lastT = last.bottom - con.offsetTop;

  if (lastT <= this.height && this.finished) {
    // 到达底部，需要重新渲染数据)
    var that = this;
    this.finished = false;
    if(that.tempHeight >=that.tempHeight1){
      that.tempHeight1 = that.tempHeight
      this.scrollDownState = true;
    };
    this.startIndex = this.startIndex + this.size;
    that.tempHeight = that.tempHeight + that.size * that.perHeight;
    if (that.render()) {
      ul.style.transform = `translate3d(0px, ${that.tempHeight}px, 0px)`
    };
  }
}
LongScrollList.prototype.render = function () {
  this.flag = false;
  var tem = '';
  for (var i = this.startIndex; i < this.startIndex + this.size * 2; i++) {
    if (dataSource && this.dataSource.ex_list[i] && this.dataSource.ex_list[i].dateline) {
      tem += liTemplate(this.dataSource.ex_list[i].dateline + '--' + i);
    }
  }
  if (this.scrollDownState) {
    fix.style.paddingTop = this.tempHeight1 + 3 * this.size * this.perHeight + 'px';
  }
  ul.innerHTML = tem;
  this.finished = true;
  return true;
}
LongScrollList.prototype.scrollUp = function () {
  first = document.querySelectorAll('li')[0].getBoundingClientRect();
  firstT = first.bottom - con.offsetTop;
  if (firstT >= 0 && this.finished) {
    if (this.startIndex == 0) {
      return;
    } else {
      this.scrollDownState = false;
      var that = this;
      this.finished = false;
      this.startIndex = this.startIndex - this.size > 0 ? this.startIndex - this.size : 0;
      that.tempHeight = that.tempHeight - that.height;
      if (that.render()) {
        ul.style.transform = `translate3d(0px, ${that.tempHeight}px, 0px)`
      };
    }
  }
}
LongScrollList.prototype.init = function () {
  this.render();
}
LongScrollList.prototype.scrollCallback = function () {

  if (this.scrollTop > con.scrollTop) {
    // 向上滑动
    this.scrollUp();
  } else {
    // 向下滑动
    this.scrollDown();
  }
}

var liTemplate = function (data) {
  return `<li>${data}</li>`
}

var scrollData = new LongScrollList({ dataSource: dataSource.data, size: 10, height: 300, perHeight: 30, tempHeight: 0 })
scrollData.init();
con.addEventListener('scroll', function () {
  scrollData.scrollCallback();
  scrollData.scrollTop = this.scrollTop;
})
