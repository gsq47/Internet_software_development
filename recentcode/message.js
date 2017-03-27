var PORT=5277;
var http=require('http');
var qs = require('qs');
var parseStr=require('xml2js').parseString;
var TOKEN='sspku';
function checkSignature(params,token){
	var key = [token,params.timestamp,params.nonce].sort().join('');
	var sha1=require('crypto').createHash('sha1');
	sha1.update(key);
	return sha1.digest('hex')==params.signature;
}
var server = http.createServer(function(request,response){//使用http模块创建服务器
		var query=require('url').parse(request.url).query;
		var params=qs.parse(query);
		if(!checkSignature(params,TOKEN)){
		response.end('signature fail');
		return;
		}
		//以上内容与verify.js微信TOKEN验证内容一致，不再进行注释
		if(request.method=="GET"){//判断如果请求是get
		response.end(params.echostr);//服务器返回echostr，用于通过服务器有效校验
		}else{
		var postdata="";
		request.addListener("data",function(postchunk){//request添加事件，发生data事件时，将返回的值记录到postdata中
				postdata+=postchunk;
				});
		request.addListener("end",function(){
				//var jsonpostdata=JSON.parse(postdata);
				console.log("this is postdata: "+postdata);//以xml格式返回用户发送的数据
				parseStr(postdata,function(err,result){//parseStr使用了xml2js模块，将xml格式的postdata转换为json格式
				if(err){
				console.log(err);
				return;
				}
				console.log("this is result: "+JSON.stringify(result));//JSON.stringify函数将result转换为json字符串
				//var jsonpostdata=JSON.stringify(result);
				//replyText(result);
				//response.end(jsonpostdata);
				})
				response.end('success');
				});
			}
			});
				/*function replyText(jsonpostdata){
				var tmpl=require('tmpl');
				var replyTmpl='<xml>'+'<ToUserName><![CDATA[{toUser}]]></ToUserName>'+
				'<FromUserName><![CDATA[{fromUser}]]></FromUserName>'+
				'<CreateTime><![CDATA[{time}]]></CreateTime>'+
				'<MsgType><![CDATA[{type}]]></MsgType>'+
				'<Content><![CDATA[{content}]]></Content>'+
				'</xml>';
				return tmpl(replyTmpl,{
				toUser:jsonpostdata.xml.FromUserName[0],
				fromUser:jsonpostdata.xml.ToUserName[0],
				type:'text',
				time:Date.now(),
				content:'hello guanguan'
				});
			}*/


server.listen(PORT);
console.log("Server runing at port: "+ PORT+".");
