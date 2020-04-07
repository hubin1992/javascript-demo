class Promise {
  constructor(executor) {
    this.state = 'pendding';
    this.value;
    this.reason;
    let resolve = (value) => { //状态改变
      if (this.state == 'pendding') { // 这一句对应文档中，只能从pendding 到resolve，或者reject
        this.state = 'resolve'
        this.value = value
      }
    }
    let reject = (reason) => {
      if (this.state == 'pendding') {
        this.state = 'reject'
        this.reason = reason
      }
    }
    executor(resolve, reject)
  }

  //  我们then方法写成这样，输出的是456
  //分析一下问题，因为我们只有一个state，而后执行的reject，所以then方法执行的时候执行的是reject，所以输出的是456
  then(onfulfilled, onrejected) {
    if (this.state == 'resolve') {
      onfulfilled(this.value)
    } else if (this.state == 'reject') {
      onrejected(this.reason)
    }
  }
}

module.exports = Promise