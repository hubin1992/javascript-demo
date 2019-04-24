/**
 * Created by hubin on 2018/4/19;
 */


var fs = require("fs"),
    http = require("http"),
    url = require("url");
var server = http.createServer(function (res, req) {
    var objUrl = url.parse(res.url, true),
        pathName = objUrl.pathname,
        query = objUrl.query;


    //请求静态资源文件

    var reg = /\.(HTML|CSS|JS|ICO)/i;
    if (reg.test(pathName)) {
        var lan = reg.exec(pathName)[1].toUpperCase();
        var lanType = "text/html";
        switch (lan) {
            case "CSS":
                lanType = "text/css";
                break;
            case "JS":
                lanType = "text/javascript";
                break;
        }
    }
    try {
        var curFile = fs.readFileSync("." + pathName, "utf-8");
        req.writeHead(200, {"content-type": lanType + ";charset=utf-8"});
        req.end(curFile);
    } catch (e) {

    }

    // 接口处理
    var result = {};
    var dataFile = JSON.parse(fs.readFileSync("data/studens.json", "utf-8"));//存储的是获取到的数据
    var curArr = [];
    if (pathName === "/getList") {
        var pageName = query["page"];
        if (!pageName) {
            result = {
                "code": 1,
                "msg": "输入正确的请求格式",
                "total": 0,
                "data": null
            };
            req.writeHead("200", {"content-type": "application/json;charset=utf-8"});
            req.end("请求失败，请求格式不对");
            return
        }

        for (var i = (pageName - 1) * 10; i <= pageName * 10 - 1; i++) {
            if (i >= dataFile.length - 1) {
                break
            }
            curArr.push(dataFile[i]);
        }

        result = {
            "code": 0,
            "msg": "请求成功",
            "total": 10,
            "data": curArr
        };
        req.writeHead("200", {"content-type": "application/json;charset=utf-8"});
        req.end(JSON.stringify(result));
        return

    }


    //点击请求个人数据

    if (pathName === "/getInfo") {

        var curID = query.id;
        result = {
            "code": 1,
            "msg": "输入正确的请求格式",
            "data": null
        };
        if (curID) {
            var idData = null;
            for (var i = 0; i < dataFile.length; i++) {
                if (dataFile[i]["id"] == curID) {
                    idData = dataFile[i];
                    result = {
                        "code": 1,
                        "msg": "请求成功",
                        "data": idData
                    };
                    break
                }
            }
        }
        req.writeHead("200", {"content-type": "application/json;charset=utf-8"});
        req.end(JSON.stringify(result));
        return
    }

    req.writeHead("404");
    req.end("url is not found")


});
server.listen(8089, function () {
    console.log("server is success listening port 8089")
});