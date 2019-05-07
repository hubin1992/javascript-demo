<?php
  //  $_GET ---》超全局的变量，用来处理所有的get请求
  //$username =  $_GET['username'];
  //echo $username;
  
  // $_POST ===>超全局变量，用来处理post请求的
  $pName = $_POST["username"];
  $pAge = $_POST["age"];
  //. 是同时输出多个的意思
  echo $pName.$pAge

?>