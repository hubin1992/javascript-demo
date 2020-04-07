### 课程主题

---

- 异步发展流程，实现一个[promise A+](https://promisesaplus.com/)规范

### 课程规划

---

- 掌握高阶梯函数，使用高阶函数解决异步问题
- 掌握发布订阅模式和观察者模式
- 掌握promise的核心应用，使用promise解决异步问题
- 实现一个完整的promise库
- 掌握promise中常见的面试题
- 扩展promise中常见的方法all，race，finally
- 掌握generator函数的使用以及co库
- 异步解决的终极方案async ，await

### 知识点

---

* 高阶函数
  * 参数是一个函数
  * 返回一个函数
  * 常用来预置参数
  * [loadsh](https://www.lodashjs.com/)几乎全部是用高阶函数来写的，推荐研究一下源码

* [Promise A+](https://promisesaplus.com/)

* promise的测试(本次测试未通过)

  ```js
  Promise.defer = function(){
    let dfd = {}
    dfd.promise = new Promise((reslove,reject)=>{
      dfd.reslove = reslove
      dfd.reject = reject
    })
    return dfd
  }
  
  //全局安装:sudo npm install promises-aplus-tests -g
  //使用:promises-aplus-tests 文件名
  ```

  

  