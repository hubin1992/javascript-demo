<?php
  //数组中的运算符
  //注意一个字符串拼接用点
  function add($anume="haha"){
    return "s".$anume;
  };
  echo add();
  echo add("xixi");


  //php的数组中常用的方法
  //数组的长度的方法 count()
  $arr = array("1","2","3");
  echo count($arr);//3

  //判断数组中是否存在某个元素in_array()
  echo in_array("1",$arr);//如果是true 输出的是1 如果是false 什么也不输出
  echo "================<br/>";

  //检测数组中是否存在某个key,此方法更适合用在关联数组
  //array_key_exists()
  $arr1 = array("name"=>"爱新觉罗","age"=>99);
  echo array_key_exists("name",$arr1);

  //读取文件，可以读取本地的，也可以读取网络的文件
  //file_get_contents()
  echo "================<br/>";
  echo file_get_contents("note.md");
  echo "================<br/>";
  echo file_get_contents("https://www.zhenai.com")
?>