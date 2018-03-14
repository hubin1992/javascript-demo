/**
 *
 * @summary public tools
 * @author hubin
 *
 * Created at     : 2018-03-13 14:24:55 
 * Last modified  : 2018-03-14 13:15:14
 */

var util = {
    //获取id
    $: function (ele) {
        return document.getElementById(ele)
    },

    //获取样式
    getStyle: function (ele, attr) { //存在几个问题，获取没有设置的样式，会有兼容，获取组合样式会有兼容，不能有空格；后期在改进
        // if(window.getComputedStyle){
        //     return getComputedStyle(ele)[attr]
        // }else{
        //     return ele.currentStyle[attr]
        // }
        return window.getComputedStyle ? parseFloat(getComputedStyle(ele)[attr]) : parseFloat(ele.currentStyle[attr])
    },

    //物体运动小动画封装
    doMove: function (obj, dir, target, step, callback, duration) {
        step = getStyle(obj, dir) <= target ? step : -step;
        obj.onclick = function () {
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                var pos = this.getStyle(obj, dir);
                if (step > 0 && pos >= target || step < 0 && pos <= target) {
                    obj.style[dir] = target + "px"
                    clearInterval(obj.timer)
                    callback && callback();
                    return;
                }
                obj.style[dir] = pos + step + "px"
            }, duration)
        }
    }


};