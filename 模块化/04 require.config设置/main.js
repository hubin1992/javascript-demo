require.config({
  //paths -->公用模块合适
  //baseUrl --> 基础路径
  //shim 
  baseUrl:"js",
  paths:{//.js不用写后缀
    jq:"lib/jquery"//我们在引用jq的时候没有define，因为jq源码里面已经定义了，所以直接引用就可以了
  }
})
define(['jq','user/login'], function(jq,login) {
  console.log('首页')
  jq()
  login()
})