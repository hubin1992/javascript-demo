class Promise {
  constructor(executor) {
    this.state = 'pendding';
    this.value;
    this.reason;
    this.resolveCallbacks = []
    this.rejectCallbacks = []
    let resolve = (value) => { //状态改变
      if (this.state == 'pendding') { // 这一句对应文档中，只能从pendding 到resolve，或者reject
        this.state = 'resolve'
        this.value = value
        // 当resolve异步结束执行的时候我们来执行
        this.resolveCallbacks.forEach((fn) => fn())
      }
    }
    let reject = (reason) => {
      if (this.state == 'pendding') {
        this.state = 'reject'
        this.reason = reason
        //同样也是处理错误的异步
        this.rejectCallbacks.forEach((fn) => fn())
      }
    }
   try{
    executor(resolve, reject)
   }catch(e){
     //exception” is a value that is thrown using the throw statement
    reject(e)
   }
  }

  then(onfulfilled, onrejected) {
    if (this.state == 'resolve') {
      onfulfilled(this.value)
    } else if (this.state == 'reject') {
      onrejected(this.reason)
    } else if (this.state == 'pendding') { //如果碰到异步的情况，我们处理方式，用发布订阅模式
      //先订阅了
      this.resolveCallbacks.push(() => {
        onfulfilled(this.value)
      })
      this.rejectCallbacks.push(() => {
        onrejected(this.value)
      })
    }
  }
}

module.exports = Promise