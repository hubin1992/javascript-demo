/**
 * Created by hubin on 2018/4/4
 */

let sum = (...arg) => {
    let total = null;
    for(let i =0;i<arg.length;i++){
        let cur = Number(arg[i]);
        if(!isNaN(cur)){
            total+=cur
        }
    }
    return total

};
var total = sum(1,2,3,4);
console.log(total);