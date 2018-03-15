/**
 *
 * @summary public tools
 * @author hubin
 *
 * Created at     : 2018-03-13 14:24:55 
 * Last modified  : 2018-03-15 10:50:25
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
    doMove: function (obj, target, dir, step, duration, callback) {
        var _this = this
        step = this.getStyle(obj, dir) <= target ? step : -step;
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var pos = _this.getStyle(obj, dir)
            if (step > 0 && pos + step >= target || step < 0 && pos + step <= target) {
                obj.style[dir] = target + "px"
                clearInterval(obj.timer)
                callback && callback();
                return;
            }
            obj.style[dir] = pos + step + "px"
        }, duration)

    },

    //抖动函数的封装

    shake: function () {
        if (obj.onoff) {
            return
        }
        obj.onoff = true; //很巧妙的思维，如果不到num===arr.length中，不回执行第二次
        var pos = this.getStyle(obj, attr); //抖动的函数，不需要实时获取位置,不像domove那样，来实时获取
        var num = 0; //num放到里面来，是为了，多个效果执行的时候，都不影响；
        var arr = [];
        //制造数据
        for (var i = 20; i > 0; i -= 2) {
            arr.push(i, -i)
            arr.push(0)
        }
        clearInterval(obj.shake);
        obj.shake = setInterval(function () {
            obj.style[attr] = pos + arr[num] + "px";
            num++;
            if (num == arr.length) {
                clearInterval(obj.shake);
                callback && callback()
                num = 0;
                obj.onoff = false;
            }
        }, 20)
    }




};