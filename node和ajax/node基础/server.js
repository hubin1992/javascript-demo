/**
 * Created by hubin on 2018/4/4
 */
var http = require("http"),
    fs =require("fs"),
    url = require("url");//解析我们获得客户端的url


//1、http.createServer() 创建一个服务
//2、server就是我们创建的服务server.listen()我们监听的端口号
var server = http.createServer(function (request,response) {//这个回调当我们从客户端发送请求请求成功后才会执行的一个回调
    // request  : 是放我们所有的从客户端请求的信息

    var objUrl = url.parse(request.url);
    var pathname = objUrl.pathname;//是我们请求的源码

    var query = objUrl.query;//是我们请求？号传参

    //根据url的请求获取到对应资源文件中的内容
    //FS.readFileSync([path+name],[encode])
    if(pathname){//如果请求的地址存在那么我们返回内容给客户端
        var con = fs.readFileSync("./"+pathname,"utf-8");
        // response : 提供了向客户端返回内容和数据的方法
        response.write(con);//返回给客户端
        response.end();//告诉服务器响应结束
    }

});
server.listen(8080,function () {
    //监听端口，当前服务创建成功，并且端口号也监听成功，会执行这个回调
    console.log("创建成功哈哈")
    
});