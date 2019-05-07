/**
 * Created by hubin on 2018/4/19
 */

//[{},{},{}];


var arr = [];

function getRandom(n, m) {
    return Math.round(Math.random()*(m-n)+n)
}
var str = '赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章';
var str1 = '以而三死无六起把就';

for(var i = 0;i<99;i++){
    var obj  = {};
    obj["id"] = i;
    obj["name"] = str[getRandom(0,39)]+str1[getRandom(0,8)];
    obj["sex"] = getRandom(0,1);
    obj["score"] =getRandom(59,99);
    arr.push(obj)
}

console.log(JSON.stringify(arr));

