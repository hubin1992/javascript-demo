/**
 * Created by hubin on 2018/4/10
 */

var http = require("http"),
    url = require("url"),
    fs = require("fs");

var server = http.createServer(function (res, req) {
    //获取静态文件
    var objUrl = url.parse(res.url, true),
        pathname = objUrl.pathname,
        query = objUrl.query;


    //如果这样会在ie中出现无法解析的情况，所以我们需要重新写头
    var reg = /\.(CSS|HTML|JS|ICO)/i;
    if (reg.test(pathname)) {
        var lan = reg.exec(pathname)[1].toUpperCase();
        var lanType = "text/html";
        switch (lan) {
            case "CSS":
                lanType = "text/css";
                break
            case "JS":
                lanType = "text/javascript";
                break
        }
        //因为浏览器要默认的要请求一个图片的ico的格式，我们服务器端没有会产生一个报错，为了不影响程序的正常执行，所以我们要捕获一下
        try {
            var curFIle = fs.readFileSync("." + pathname, "utf-8");
            //重写头
            req.writeHead(200, {
                "content-type": lanType + ";charset=utf-8;"
            });
            req.end(curFIle)
        } catch (e) {
            req.writeHead(404, {
                "content-type": lanType + ";charset=utf-8;"
            });
            req.end("file is not found")
        }


    }

    //按照api来写接口
    //请求全部数据
    var conFile = null,
        reslut = null;
    var dataUrl = './json/custom.json';
    conFile = fs.readFileSync(dataUrl, "utf-8");
    conFile.length == 0 ? conFile = '[]' : null;
    conFile = JSON.parse(conFile);

    if (pathname === "/getList") {
        reslut = {
            "code": "1",
            "msg": "没有返回的信息",
            "data": null
        };
        if (conFile.length > 0) {
            reslut = {
                "code": 0,
                "msg": "请求成功",
                "data": conFile
            }
        }
        req.writeHead(200, {
            "content-type": "application/json;charset=utf-8"
        });
        req.end(JSON.stringify(reslut));
        return;
    }

    //获取某一个用户的信息
    if (pathname === "/getInfo") {
        var customId = query["id"];
        reslut = {
            "code": 1,
            "mes": "没查询到此客户",
            "data": null
        }
        for (var i = 0; i < conFile.length; i++) {
            var curId = conFile[i]["id"];
            if (curId == customId) {
                reslut = {
                    "code": 0,
                    "msg": "查询成功",
                    "data": conFile[i]
                };
                break;
            }
        }
        req.writeHead(200, {
            "content-type": "application/json;charset=utf-8"
        });
        req.end(JSON.stringify(reslut));
        return;
    }
    //删除一个用户的信息
    if (pathname == "/removeList") {
        var customId = query["id"];
        var flag = false;
        reslut = {
            "code": 1,
            "mes": "没查询到此客户",
            "data": null
        };

        for (var i = 0; i < conFile.length; i++) {
            var curId = conFile[i]["id"];
            if (curId == customId) {
                conFile.splice(i, 1);
                reslut = {
                    "code": 0,
                    "mes": "删除成功",
                };
                flag = true;
                break;
            }
        }
        if (flag) {
            fs.writeFileSync(dataUrl, JSON.stringify(conFile), "utf-8"); //如果我们请求成功了，那么我们需要重写数据
        }
        //放在外面是为了照顾如果请求失败的话我们可以返回另外一个参数
        req.writeHead(200, {
            "content-type": "application/json;charset=utf-8"
        });
        req.end(JSON.stringify(reslut));
        return;
    }

    //增加用户
    if (pathname == "/addList") {
        var str = "";
        res.on("data", function (chunk) { //data是post传进来的数据
            str += chunk;
        });
        res.on("end", function () {
            var curData = JSON.parse(str);
            var lastId = parseFloat(conFile[conFile.length - 1]["id"]);
            var curId = lastId + 1;
            if (str.length === 0) {
                reslut = {
                    "code": 1,
                    "msg": "添加的数据为空"
                };
                req.writeHead(200, {
                    "content-type": "application/json;charset=utf-8"
                });
                req.end(JSON.stringify(reslut));
                return
            }
            //'{"name":xxx,"age":xxx}'
            //传进来增加的数据
            //我们要作一个判断，如果没有数据，那么他的id就是1
            if (conFile.length == 0) {
                curData["id"] = 1
            }
            curData["id"] = curId; //'{"name":xxx,"age":xxx,"id":curId}'
            conFile.push(curData); //写进我们拿到的这个数据中
            fs.writeFileSync(dataUrl, JSON.stringify(conFile), "utf-8"); //写入到后台的文件，注意是json的字符串格式
            reslut = {
                "code": "0",
                "msg": "添加成功"
            };
            req.writeHead(200, "{content-type:application/json;charset=utf-8}");
            req.end(JSON.stringify(reslut));

        });
        return
    }


    //修改用户
    if (pathname == "/updateList") {
        var str = "";
        res.on("data", function (chunk) { //接受post方法传递的数据
            str += chunk
        });
        res.on("end", function () { //post数据接受完成
            if (str.length === 0) {
                reslut = {
                    "code": 1,
                    "msg": "修改失败，没有传递任何值"
                };
                req.writeHead(200, {
                    "content-type": "application/json;charset=utf-8"
                });
                req.end(JSON.stringify(reslut));
                return
            }
            var curData = JSON.parse(str);
            var flag = false;
            for (var i = 0; i < conFile.length; i++) {
                if (conFile[i]["id"] == curData["id"]) {
                    conFile[i] = curData;
                    flag = true;
                    break
                }
            }
            if (flag) {
                fs.writeFileSync(dataUrl, JSON.stringify(conFile), "utf-8");
                reslut = {
                    "code": 0,
                    "msg": "修改成功"
                }　
                req.writeHead(200, {
                    "content-type": "application/json;charset=utf-8"
                });
                req.end(JSON.stringify(reslut));
                return
            } else {
                reslut = {
                    "code": 1,
                    "msg": "没有此id"
                };
                req.writeHead(200, {
                    "content-type": "application/json;charset=utf-8"
                });
                req.end(JSON.stringify(reslut));
                return
            }

        })
        return
    }
    req.writeHead(404, {
        "content-type": "application/json;charset=utf-8"
    });
    req.end("没有此接口的请求地址");
    return

});
server.listen(8091, function () {
    console.log("server is success listening 8091 port")
});