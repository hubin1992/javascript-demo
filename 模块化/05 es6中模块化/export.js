
let aFn = {
  name: "haha",
  age: "18",
  fn() {
    console.log(`my name is ${this.name},my age is ${this.age}`)
  }
}
//export   --- 输出
export { aFn }