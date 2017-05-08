var mysql=require('mysql');
var connection=mysql.createConnection({//建立数据库连接
    host:'localhost',//options选项包括host主机地址，user数据库用户名 密码 以及数据库名称
	user:'mynode',
	password:'123456',
	database:'mynode'

});

connection.connect(function (err){
    if(err)throw err;//如果发生错误则打印错误
	var value='bing"OR"1"="1';//防止发生sql注入
//	var query= connection.query('SELECT * FROM user where name="'+value+'"',function(err,ret){
    var query=connection.query('SELECT * FROM user where name=?',value,function(err,ret){//通过查询语句查找相应的值，ret是查询到的结果
    if(err)throw err;
	console.log(ret);
	connection.end();//结束连接
	});
	console.log(query.sql);//查询语句
});
