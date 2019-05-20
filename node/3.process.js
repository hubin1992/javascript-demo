// process 表示当前的进程
console.log(process)
//常用的属性
//argv  ---- 如何写一个vue cli的脚手架，需要用到argv

//chdir --- change directory 改变当前的目录 
console.log(process.cwd());///Users/hubin/learn-file/js
process.chdir("..")//切换到上一层目录
console.log(process.cwd());///Users/hubin/learn-file

//nextTick 把回调函数放在执行栈的最后

//memoryUsage 检测当前内存的使用量
console.log(process.memoryUsage());
/*
  {
  rss: 20332544,   常驻内存
  heapTotal: 6537216, 堆内存的总申请量
  heapUsed: 3955808, 已经使用的量
  external: 8272 外部内存的使用量
}

*/