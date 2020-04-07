let resolvePromise = (promise2, x, resolve, reject) => {
  //这里来判断x的类型
  //If promise and x refer to the same object, reject promise with a TypeError as the reason. ru
  if (promise2 === x) {
    return reject(new TypeError('循环引用'))
  }

  //Otherwise, if x is an object or function
  if (typeof x === 'function' || (typeof x === 'object' && x != null)) {
    // if x is an object or function,  if x is an object or function,
    try {
      //Let then be x.then
      let then = x.then
      if (typeof then === 'function') {
        then.call(x, (y) => {
          //If/when resolvePromise is called with a value y, run [[Resolve]](promise, y)
          resolvePromise(promise2, y, resolve, reject)
        }, (r) => {
          //If/when rejectPromise is called with a reason r, reject promise with r.
          reject(r)
        })
      } else {
        //If then is not a function, fulfill promise with x.
        resolve(x)
      }

    } catch (e) {
      //if retrieving the property x.then results in a thrown exception e, reject promise with e as the reason.
      reject(e)
    }
  } else {
    //If x is not an object or function, fulfill promise with x.
    //  如果不是对象或者函数，他就是个常量
    resolve(x)
  }

}
class Promise {
  constructor(executor) {
    this.state = 'pendding';
    this.value;
    this.reason;
    this.resolveCallbacks = []
    this.rejectCallbacks = []
    let resolve = (value) => {
      if (this.state == 'pendding') {
        this.state = 'resolve'
        this.value = value
        this.resolveCallbacks.forEach((fn) => fn())
      }
    }
    let reject = (reason) => {
      if (this.state == 'pendding') {
        this.state = 'reject'
        this.reason = reason
        this.rejectCallbacks.forEach((fn) => {
          fn()
        })
      }
    }
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onfulfilled, onrejected) {
    //then must return a promise [3.3].
    //promise 每次在then都是返回一个新的promise，因为这样才可能完成状态的切换，如果返回的this那么，他只能走成功态，或者失败态
    let promise2
    promise2 = new Promise((resolve, reject) => {
      if (this.state == 'resolve') {
        // 这里执行的是then成功后的回调
        //onFulfilled or onRejected throws an exception e, promise2 must be rejected with e as the reason.
        setTimeout(() => {
          try {
            // x就是我们回调里面返回的return
            let x = onfulfilled(this.value)
            // onFulfilled or onRejected returns a value x, run the Promise Resolution Procedure [[Resolve]](promise2, x).
            //这里相当于返回给了下一个resolve
            // resolve(x)  --->这里仅仅是把x当作一个值来处理
            //关于这个x，不仅仅是值，还有可能是一个promise对象，所以我们这边要做一个处理
            //文档里说这里面用另外一个程序来处理
            resolvePromise(promise2, x, resolve, reject)  //promise2 是还未生成的，所以这个位置需要异步，但是同时呢，try，catch检测不到异步错误，所以我们需要在外面来解决
            //promise2 是需要判断的类型   
            //x 是我们失败或者成功要传递的值，
            //resolve，reject都是我们成功或者失败要执行的方法
          } catch (e) {// 如果报错了直接走这
            reject(e)
          }
        }, 0)

      } else if (this.state == 'reject') {
        // 这里执行的是then失败后的回调
        setTimeout(() => {
          try {
            let x = onrejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      } else if (this.state == 'pendding') { //这里处理的是异步的问题
        //这里面本身处理的就是异步，所以我们不需要去用异步的
        this.resolveCallbacks.push(() => {
          try {
            let x = onfulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
        this.rejectCallbacks.push(() => {
          try { //如果返回的是错误普通的值，那么我们也要继续走resolve
            let x = onrejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
    })
    return promise2


  }
}

module.exports = Promise