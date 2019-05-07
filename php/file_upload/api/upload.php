<?php
//接受请求
//$_FILES ===>用来接受上传的文件，返回值是一个数组 
//输出一下看看
//var_dump($_FILES)
//输出
//file_up==>就是我们前台定义的name
/*
array(1) { ["file_up"]=> array(5) { ["name"]=> string(32) "Snipaste_2019-05-07_15-07-03.png" ["type"]=> string(9) "image/png" ["tmp_name"]=> string(45) "/Applications/XAMPP/xamppfiles/temp/phpq1XiPi" ["error"]=> int(0) ["size"]=> int(2371403) } }
*/
$_files = $_FILES;//接受这个数组


//处理请求
//1. 上传的数据，服务器默认是有个存储位置的
//2. 我们需要拿到这个存储的位置和名称移动到我们指定的目录下,同时在数据库进行一个记录
//3. 利用move_upload_file(默认的位置,移动到指定位置路径/以及文件的名称)
$fileName = $_files["file_up"]["name"];//获取的文件的名称
$tmp_name = $_files["file_up"]["tmp_name"];//获取的文件存在服务器的临时地址
//移动到指定的文件夹
move_uploaded_file($tmp_name,"../images/".$fileName);
//响应
//echo "上传成功"

?>