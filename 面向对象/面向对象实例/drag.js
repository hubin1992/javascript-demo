
class Drag {
  constructor(ele) {
    this.ele = ele;
    this.posX;
    this.posY;
    this.startX;
    this.startY;
    this.down();
  }
  down() {

    let _this = this;
    _this.ele.addEventListener('mousedown', function (e) {
      _this.startX = _this.ele.offsetLeft;
      _this.startY = _this.ele.offsetTop;
      _this.posX = e.clientX;
      _this.posY = e.clientY;
      _this.move();
      _this.up();
      e.preventDefault();
    });
  }
  move() {
    let _this = this;
    document.onmousemove = function (e) {
      let curX = e.clientX - _this.posX;
      let curY = e.clientY - _this.posY;
      let boxY = _this.startY + curY;
      let boxX = _this.startX + curX;
      _this.setStyle(boxY, boxX);
    };
  }
  setStyle(boxY, boxX) {
    boxX = Math.min(Math.max(0, boxX), document.documentElement.clientWidth - this.ele.offsetWidth);
    boxY = Math.min(
      Math.max(0, boxY),
      document.documentElement.clientHeight - this.ele.offsetHeight
    );
    this.ele.style.top = boxY + 'px';
    this.ele.style.left = boxX + 'px';
  }
  up() {
    let _this = this;
    _this.ele.addEventListener('mouseup', function (e) {
      document.onmousemove = '';
    });
  }
}
export default Drag


