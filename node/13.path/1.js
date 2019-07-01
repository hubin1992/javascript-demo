//path 中常用的api

const path = require("path");
// console.log(path)

//path.json() 路径拼接
//__dirname
//basename
//extname
//parse
//sep
//delimiter
//resolve

//1. 路径拼接
console.log(path.join("a","1.html")) ;//"a/1.html"
//2. __dirname,__filename 显示绝对路径
console.log(__dirname);///Users/hubin/learn-file/js/node/13.path 显示的是绝对路径
console.log(__filename);//显示的是当前文件的绝对路径
//3. basename(路径,后缀) 显示名字
console.log(path.basename("1.jpg")) //1.jpg 显示的就是名字

//4. extname 显示扩展名字
console.log(path.extname("1.jpg")) //.jpg

//5. parse(string)
console.log(path.parse(__dirname)) ;
/* 
{ root: '/',
  dir: '/Users/hubin/learn-file/js/node',
  base: '13.path',
  ext: '.path',
  name: '13' }
*/

//6. path.format(obj) 这个obj是固定的方式{root,dir,base}
console.log(path.format({
  root:"/root",
  dir:"a/b/c",
  base:"2.txt"
}));//a/b/c/2.txt像这样的默认是省略root

//path.sep() ;//提供平台特定的路径片段分隔符：  Windows 上是 \    POSIX 上是 /
//path.delimiter() ;// 提供平台特定的路径定界符 ;是window   :是POSIX

//7.path.reslove()  -->个人感觉用的较少  path.resolve() 方法将路径或路径片段的序列解析为绝对路径。
console.log(path.resolve())