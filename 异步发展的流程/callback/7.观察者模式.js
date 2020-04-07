// 观察者模式： 观察者与被观察者是有关系的，如果被观察者发生了变化，会主动的通知观察者
// 发布订阅模式: 发布和订阅之间没有什么联系，靠的是中间件。
//两者的关系
// 观察者模式里面就运用了发布订阅模式

class Subject{
  constructor(name){
    this.name = name
    //存放的是观察者
    this.observers = []
    //宝宝的状态
    this.state = '心情好'
  }
  attach(observer){
    this.observers.push(observer)
  }
  setState(newState){
    //状态改变的时候需要通知被观察者
    this.state = newState
    this.observers.forEach(cb=>cb.update(newState,this.name))
  }
}

class Observers {
  constructor(name){
    this.name = name
  }
  update(newState,subject) {
    console.log(this.name+"-say:"+subject+newState)
  }
}

let sub = new Subject('baby')

let o1 = new Observers('father')
let o2 = new Observers('mather')
let o3 = new Observers('sister')
sub.attach(o1)
sub.attach(o2)

sub.setState('心情不好')



