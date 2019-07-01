const express = require("express");
//我估计就是创建一个express的实例
const app = express();
const path = require("path")
//路由
app.get("/",(req,res)=>{
  res.send("hello world")
})
// app.post("/",(req,res)=>{
//   res.send("get a post request")
// })
// app.put("/user",(req,res)=>{
//   res.send("put success in /user")
// })
// app.delete('/user', function (req, res) {
//   res.send('Got a DELETE request at /user')
// })
//静态文件的托管
app.use(express.static(path.join(__dirname,"public")))
app.listen("3000",(err)=>console.log("express listening port on 3000"))