var http = require('http');
var url = require('url');
var parseStr=require('xml2js').parseString;
var fs = require('fs');
var qstring = require('querystring');
var zodiacreturn=require('./appzodiac1.js');
function sendResponse(weatherData,res){
	var page = '<html><head><title>External Example</title></head>'+
	'<body>'+
	'<form method="post">'+
	'City:<input name="city"><br>'+
	'<input type="submit" value="Get Weather">'+
	'</form>';

	if(weatherData){
	page+='<h1>Weather Info</h1><p>'+weatherData+'</p>';
	}
	page+='</body></html>';
	res.end(page);
	//console.log("test after res.end");
	//zodiacreturn.getvalue(weatherData);
	return weatherData;
}
function parseWeather(weatherResponse,res){
	var weatherData='';
	weatherResponse.on('data',function(chunk){
	weatherData += chunk;

	});
	
	weatherResponse.on('end',function(){
	//console.log("there is parseweather weatherResponse.on");
	var data;
	data = sendResponse(weatherData,res);
	//console.log("data is: "+data);
	return data;
	});
}
function getWeather(city,res){
	console.log("this is getWeather");
	var key='834179be0e475ab3'
	var options={
	host:'api.jisuapi.com',
	path: '/astro/fortune?astroid='+city+'&appkey='+key
	};
http.request(options,function(weatherResponse){
var pwdata;
//pwdata=parseWeather(weatherResponse,res);
var weatherData='';
weatherResponse.on('data',function(chunk){
weatherData+=chunk;
});
weatherResponse.on('end',function(){
var data;
data=sendResponse(weatherData,res);
//console.log("there is true data aaaaaa: "+data);
zodiacreturn.getvalue(data);
pwdata=data;
return data;
});
//console.log("This is pwdata HHHHHHHHHHHHHH: "+pwdata);
}).end();
}
var data;
exports.area=function(request,response){
console.log("diaoyongle: "+request.weixin.Content);
var ss=request.weixin.Content;
var valuereturn;
console.log(ss);
var key = '834179be0e475ab3';
var options={
host:'api.jisuapi.com',
path:'/astro/fortune?astroid='+parseInt(ss)+'&appkey='+key
};
http.request(options,function(weatherResponse){
var weatherData='';
weatherResponse.on('data',function(chunk){
weatherData+=chunk;
});
weatherResponse.on('end',function(){
//var data;
data = weatherData;
console.log("HHHHHHHHHHHHHHHHHHHHHHHERE");
//console.log("data is : "+data);
zodiacreturn.getvalue(data);
var options={encoding:'utf8',flag:'w'};
fs.writeFile('zodiac.txt',data,options,function(err){
if(err){
console.log("Config Write Failed.");
}else{
console.log("Config Saved");
}
});
//parseStr(data,function(err,result){
//if(err){
//console.log(err);
//return
//}
//console.log(result);
//});
//console.log(parseStr(data));
//return data;
});
}).end(data)
//console.log(data);

//return data;
//valuereturn=getWeather(parseInt(ss),response);
//console.log("this is valuereturn : "+valuereturn);
//}
//http.createServer(function(request,response){
//console.log(request.method);
//if(request.method=="POST"){
//var reqData ='';
//request.on('data',function(chunk){
//reqData+=chunk;
//});
//request.on('end',function(){
//var postParams =qstring.parse(reqData);
//console.log(postParams);
//getWeather(parseInt(postParams.city),response);
//console.log(parseInt(postParams.city));
//});
//}else{
//sendResponse(null,response);
//}
//});
}
