//操作文件夹

let fs = require("fs");

//创建一个文件夹
//fs.mkdir(path,cb(err))
//创建一个单独的文件夹
// fs.mkdir("./a",function(err){
//   err?console.log(err):console.log("创建成功")
// })

//创建多个文件夹
//所以我们这样创建不了多个文件夹
// fs.mkdir("a/b/c",function(err){
//   err? console.log(err) : console.log("创建成功")//no such file or directory
// })


function mkdir_d(directoy) {//我们思路，就是拆开一个个创建，如果有了，跳过，如果没有的话，创建，然后用递归来实现创建多个
  //拆分成数组的原因，就是为了判断递归是在什么时间结束
  let index = 1
  let arr = directoy.split("/");
  // console.log(arr);//[ 'a', 'b', 'c' ]
  !function next(index) {
    //我们首先要判断 "a" 然后 "a/b" 然后 "a/b/c"
    let curPath = arr.slice(0, index).join("/")
    if (index > arr.length) return
    fs.access(curPath, function (err) {
      if (err) {//就说明没有文件，那么我们就需要创建一个
        fs.mkdir(curPath, function (err) {
          err ? console.log(err) : next(++index)
        })
      }else{
        next(++index)
      }
    })
  }(index)
}
mkdir_d("a/b/c")

//测试用户对 path 指定的文件或目录的权限
// fs.access(path,[mode],cb) mode：权限默认的fs.constants.F_Ok(表明文件对调用进程可见。 这对于判断文件是否存在很有用) | fs.constants.R_Ok(表明文件对调用进程可见。 这对于判断文件是否存在很有用) | fs.constants.W_OK(表明调用进程可以写入文件。)

// fs.access("./a",fs.constants.F_OK,function(err){
//   err? console.log(err) : console.log("有文件")
// })