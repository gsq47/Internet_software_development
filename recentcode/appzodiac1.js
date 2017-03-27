var wechat = require('wechat');//使用wechat模块实现微信测试好回复功能，
var http=require('http');
var fs=require('fs');
var shenqingzodiac=require('./weather.js');
var mm='';
var config = {
  token: 'sspku',
  appid: 'wx48309e52143c450e',
  //encodingAESKey: 'encodinAESKey',
  checkSignature: true
};
var express=require('express');//使用express模块，该模块封装了http功能，使用户更方便的创建服务器
var app=express();
exports.getvalue=function(valuereturn){
//console.log("I am in the getvalue!"+ valuereturn);
return valuereturn;
}
function getZodiac(zodiac, res){
var key = '834179be0e475ab3';
var options={
	host:'api.jisuapi.com',
	path:'/astro/fortune?astroid='+zodiac+'&appkey='+key
};
console.log("here is define options finish");
//var http =require('http');
//http.request(options,function(res){
	var zodiacData='';
res.on('data',function(chunk){
	zodiacData+=chunk;
console.log("this is zodiacResponse.on");
});
res.on('end',function(){

	console.log(zodiacData);
}).end(zodiacData);
//});
}
app.use(express.query());
app.use('/', wechat(config, function (req, res, next) {
  var message = req.weixin;//message为用户发送的数据内容
 console.log(req.weixin);
  if (message.MsgType === 'text') {//可以根据MsgType判断用户发送的数据的类型，如果是文字就执行下面操作
  if (message.Content === 'hi'||message.Content === 'hello') {
	   res.reply({
	    content: message.Content,
	    type: 'text'
       });
  }else if(message.Content =='1'||message.Content=='2'||message.Content=='3'||message.Content=='4'||message.Content=='5'||message.Content=='6'||message.Content=='7'||message.Content=='8'||message.Content=='9'||message.Content=='10'||message.Content=='11'||message.Content=='12'){

	//var yunshi=ServerZodiac(parseInt(message.Content),res);
	//console.log(getZodiac(1,res));
	//req.on('end',function(){
	//getZodiac(parseInt(message.Content),res);
	//});
	var yy;
	yy=shenqingzodiac.area(req,res);
	var options={encoding:'utf8',flag:'r'};
	//var mm;
	function Gettext(err,data,s){
	if(err){
	console.log("Failed");
	}else{
	s=data;

	}
	}
	//fs.readFile('zodiac.txt',options,function(err,data){
	//if(err){
	//console.log("Failed");
	//}else{
	//mm=data;
	//console.log("typeof mm: "+typeof(mm));
	//Gettext(err,data,mm);
	//}
	//});
	//mm=
	//console.log(typeof(fs.readFile('zodiac.txt',options))+"fsfs");
	//console.log("this is yy"+yy);
	//var fileReadStream=fs.createReadStream('zodiac.txt',options);
	//fileReadStream.on('data',function(chunk){
	//mm=chunk;
	//console.log("OH shit: "+mm);
	//chunk=JSON.stringify(chunk);
	//console.log("chunk :"+chunk.status);
	//return chunk;
	//});
	//for(var i in mm){
	//console.log("i is : "+i);
	//}
	//console.log("this is mm :"+mm);
	var fs=require('fs');//使用文件模块
	fd=fs.openSync('zodiac.txt','r');//将数据从txt文件中读取到
	var buf = new Buffer(1280);
	buf.fill();
	var bytes=fs.readSync(fd,buf,null,1280);
	var okstr=buf.toString();
	//okstr=JSON.stringify(okstr)
	console.log('this is okstr:  '+okstr);
	//console.log("this is type of mm: "+mm);
	//var mmc=JSON.stringify(mm);
	//console.log("this is mm.result: "+mm.);
	res.reply({//实现返回数据到客户端
	content:okstr,
	type: 'text'
	});
	}
}
else if (message.MsgType === 'location') {//如果用户输入的是位置

    res.reply({
      type: "text",
	content:"you location is :"+message.Label//message.Label代表位置上的文字描述
     // }
    });
  } else if(message.MsgType==='image'){//如果是图片

    res.reply(
      {
       	type:"text",
	content:"this is a beautiful picture!"
      }
    );
  }
}));
app.listen(5277);//监听5277端口
