let http = require("http");
let fs = require("fs"),
    url = require("url");


let server = http.createServer(function (req, res) {//客户端请求成功返回
    // console.log(req.url)
    let objUrl = url.parse(req.url),
        pathname = objUrl.pathname,
        query = objUrl.query;

    // try {
        if (pathname) {
            let con = fs.readFileSync("." + pathname, "utf-8");
            res.write(con);
            res.end();
            //执行结束会有一个报错，这个错误是浏览器自动请求造成的，所以我们要做一个容错处理，避免服务器崩掉
        }
    // }catch(e){//必须加上e
    //     res.write("req file is not find");
    // }


});
//监听一个接口
server.listen(8090, function () {
    console.log("server is success")
});