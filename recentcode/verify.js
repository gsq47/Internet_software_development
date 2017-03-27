var PORT = 5277;
var http = require('http');
var qs=require('qs');
var TOKEN = 'sspku';
function checkSignature(params,token){
var key = [token,params.timestamp,params.nonce].sort().join('');//sort()对数组进行排序，
//无参数代表按照字母顺序排序，join将其中的元素通过参数连接
var sha1 = require('crypto').createHash('sha1');//使用crypto模块，创建并返回一个hash对象，参数是使用sha1算法进行加密
sha1.update(key);//hash.update()方法将字符串相加
//通过hash.update()以及hash.digest()方法得到计算过的hash值
return sha1.digest('hex')==params.signature;
}
var server = http.createServer(function(request,response){//使用http中的模块createServer创建一个服务器，
  //当请求时间被触发时会调用匿名函数
var query=require('url').parse(request.url).query;//url模块，将请求的url字符串转换为url对象
var params = qs.parse(query);//使用qs模块将 query查询字符串解析为一组关键值以及值对
console.log(params);
console.log("token-->",TOKEN);
if(checkSignature(params,TOKEN)){//调用checkSignature函数判断查询字符串中的值是否与TOKEN一致
response.end(params.echostr);//返回echostr值
}else{
response.end('signature fail');
}
});
server.listen(PORT);//监听5277端口
console.log("Server runing at port: "+PORT+".");
