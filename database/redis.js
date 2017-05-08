var redis=require('redis');//引入redis模块

var client=redis.createClient(6379,'127.0.0.1');//返回redisclient对象 端口号为6379，redis服务器的ip地址为127.0.0.1

client.set('abc',123,function(err,ret){//设置单个key和value
    if(err)throw err;
	console.log(ret);
	client.quit();//退出redis数据库
});

client.get('abc',function(err,ret){//获取单个key和value
    if(err)throw err;
	console.log(ret);
	client.quit();//退出redis数据库
});
