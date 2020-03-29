class MyEvent {
  constructor() {
    this.handle = {}
  }
  addEvent(EventName, fn) {
    if (!(EventName in this.handle)) {
      this.handle[EventName] = []
    }
    this.handle[EventName].push(fn)
  }

  triggerEvent(EventName) {
    if (!(EventName in this.handle)) {
      return
    }
    this.handle[EventName].forEach((v) => {
      // 这里要修改this的指向
      v.call(this)
    })
  }

  removeEvent(EventName, fn) {
    let index = this.handle[EventName].indexOf(fn)
    if (index >= 0) {
      this.handle[EventName].splice(index, 1)
    }
  }
}

export default MyEvent