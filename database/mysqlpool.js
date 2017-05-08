var mysql=require('mysql');
var pool=mysql.createPool({//创建连接池
    connectionLimit:3,
	host:'localhost',
	user:'mynode',
	password:'123456',
	database:'mynode'
});
function startQuery(){
pool.getConnection(function(err,connection){
    if(err)throw err;

	var value='guan';
	var query=connection.query('SELECT * FROM user Where name=?',value,function(err,ret){
	    if(err)throw err;
		console.log(ret);
		connection.release();//结束当前连接，将其返回到连接池中
	});
	console.log(query.sql);
});
}
for(var i=0;i<10;i++){
    startQuery();//循环进行10次连接
}
