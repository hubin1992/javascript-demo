## express

[express官网]([http://www.expressjs.com.cn/](http://www.expressjs.com.cn/))

* 安装一个修改文件自动刷新的npm包

  ```js
  sudo npm i node-dev -g
  ```

####  创建一个express 简单应用

* mkdir xxx

* cd mkdir   ——>  npm init

* npn install express  —save 仅仅是依赖当前的项目 

  > 如果仅仅是临时依赖 我们可以用 ``` npm install express --no-save```

```js
//创建一个简单的hello world
const express = require("express");
const app = express();
app.get("/",(req,res)=>{
  res.send("hello world")
})
app.listen("3000",err=>console.log("express listening port on 3000"))
```

#### 利用express生成器创建和一个文件

* npm i express-generator -g 下载express生成器
* express learn-express —hbs    创建项目 learn-express是项目名称  —hbs 是我们用的模版引擎
* npm  install 默认安装所有的包
* npm start 启动项目

#### 路由

* app.get(path,cb(request,response))
* app.post()
* app.put()
* app.delete()

#### 静态文件的托管

* express.static(root,[options])

  ```js
  //这个就是我们可以利用浏览器的路径去访问服务器上的静态文件
  app.use(express.static("public"));//这样写可能会报错，因为我们最好是用绝对路径
  app.use(express.static(path.join(__dirname,"public"))//这样是完美的写法
  http://localhost:3000/1.html 直接访问就可以
          
  //还可以使用别名
  app.use(express.static("/static",path.join(__dirname,"public")))
  http://localhost:3000/static/1.html 
  
  //如果我们设置了多个开放的接口，那么我们就需要多个直接引用多个号了
  app.use(express.static('public'))
  app.use(express.static('files'))
  ```

