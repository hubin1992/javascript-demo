let a =1
function read(){
  a++
  console.log(a)
  readT()
  function readT(){
    a++
    console.log(a)
  }
}
read()