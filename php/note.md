# php

#### php 服务器的配置

* 配置默认的ip地址和localhost

  ```js
  //mac下面默认是可以访问的，所以无需配置  
  //window --> Allow from all
  ```

* 配置默认的主路径

```js
//配置的路径地址	xampp/etc/httpd.config 
//修改如下代码  ---> 引号中写我们想要指定的路径
DocumentRoot "/Users/hubin/learn-file/js/php" 
<Directory "/Users/hubin/learn-file/js/php">
```



  ### php 语法

##### 基本形式

```php
//这样就代表php语法解析了
<?php
    
?>
```

##### 变量

```php
//必须用$来定义变量
//变量以 $ 符号开头，其后是变量的名称
//变量名称必须以字母或下划线开头
//不能以数字开头
//严格区分大小写
```

##### 数据类型

```php
<?php
    //字符串
    $str = "hello"
    //整数
    $num = 12
    //浮点
    $numF = 1.2
    //布尔
    $on = true/false
    //数组
    	//普通数组
    	$arr = array("a","b","c")
    	//关联数组
    	$arr1 = array("name"=>"hehe","age"=>"17")
    //对象--->其实就是一个类
    class User {
    	
	}
	//null--->空值
?>
```

##### 输出

```php
<?php
  //输出
  echo "更多用来输出字符串";
  $arr = array("name"=>"爱新觉罗","age"=>99);

  //输出详细信息
  var_dump($arr);

  //输出详细信息
  print_r($arr)
?>
```

##### 运算符

```php
//注意一个字符串拼接的问题
//注意一个字符串拼接用点
  function add($anume="haha"){
    return "s".$anume;
  };
  echo add();
  echo add("xixi");
```

##### 数组中常用的几个方法

```php
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
```

##### 前后端的基本交互

```php

```

