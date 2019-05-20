class EventEmitter {
  constructor() {//放的私有方法
    this.events = {}
    this.max = 10;
    this.addListener = this.on
    //如果这样once不对，因为如果没执行就执行了once那么就没有所谓的一次了
    this.removeListener = this.off
  }

  on(type, listener) {//type 是事件的类型，lister是监听的函数
    //当我们绑定type的时候，因为有可能是多个，所以我们需要先保存起来
    if (this.events[type]) {//我们先判断这个类型是否有，如果有添加，如果没有，新建
      this.events[type].push(listener)
    } else {
      this.events[type] = [listener]
    }
  }

  off(type, listener) {//因为这里面是指向同一个内存地址
    this.events[type] = this.events[type].filter((item) => {
      return listener != item
    })
  }

  once(type, listener) {
    // 这个思路很好玩，once仅仅执行一次，我们不好操作listener但是我们我们把listener包一层函数，让这个函数仅仅执行一次就销毁掉了。这样不论怎么着都仅仅执行一次
    let wrraper = (...arg) => {//这里接受的emit传递过来的参数
      listener.apply(this, arg)
      this.removeListener(type, wrraper);//然后执行完成了在去移除掉
    }
    this.on(type, wrraper)//先在type上面绑定wrap
  }

  emit(type, ...arg) {//...arg传递进来除了type之类所有参数
    if (this.events[type]) {
      this.events[type].forEach((item) => {
        item.apply(this, arg);//arg就是一个数组
      })
    }
  }

}

module.exports = EventEmitter