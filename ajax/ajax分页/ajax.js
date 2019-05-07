/**
 * Created by hubin on 2018/4/8
 */


(function () {
    function createXHR() {
        //惰性思想来实现，我们执行一次的时候，我们要确定浏览器兼容那个，然后直接用兼容的这个替代我们最外面的函数，下次执行的时候，直接执行就好来
        var xhr = null;
        var arr = [//为来保存各种浏览器兼容性的可行性方法
            function () {
                return new XMLHttpRequest()
            },
            function () {
                return new ActiveXObject('Microsoft.XMLHTTP')
            },
            function () {
                return new ActiveXObject('Msxm12.XMLHTTP')
            },
            function () {
                return new ActiveXObject('Msxm13.XMLHTTP')
            }
        ];

        for (var i = 0, len = arr.length; i < len; i++) {
            var curFn = arr[i];
            try {//ActiveXObject 在标准浏览器下没有这个对象，会报错，如果报错来代码就不会执行，所以我们需要try来捕获异常
                xhr = curFn(); //获得浏览器最后可执行的方法
                createXHR = curFn;//覆盖父级函数
                break
            } catch (e) {

            }

        }
        return xhr;//new XMLHttpRequest() 假设用这个直接来创建对象

    }


    function ajax(options) {
        //default放置的是出始的值
        var _default = {
            url: "",
            type: "get",
            async: true,
            dataType: "json",
            data: null,
            getHead: null,
            success: null,
            error: null,
        };

        for (var key in options) {
            _default[key] = options[key]
        }

        //get 清除缓存
        if (_default.type == "get") {
            //dataList.txt?name=1&age=11
            if (_default.url.indexOf("?") >= 0) {
                _default.url += "&_" + Math.random();
            } else {
                _default.url += "?_" + Math.random();
            }
        }
        var xhr = new XMLHttpRequest();
        xhr.open(_default.type, _default.url, _default.async);
        xhr.onreadystatechange = function () {
            if (/^2\d{2}$/) {
                if (xhr.readyState == 2) {
                    if (typeof (_default.getHead) == "function") {
                        _default.getHead.call(xhr)
                    }
                }
                if (xhr.readyState == 4) {
                    var val = xhr.responseText;
                    if (_default.dataType == "json") {
                        val = window.JSON?JSON.parse(val):"eval("+val+")"
                    }
                    
                    _default.success && _default.success.call(xhr,val)
                }
            }
        };
        xhr.send(_default.data)
    }
    window.ajax=ajax;
})();
