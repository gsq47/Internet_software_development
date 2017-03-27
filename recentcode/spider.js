var http=require('http');
var fs = require('fs');
var cheerio = require('cheerio');
//var iconv=require('iconv-lite');
//http.get与http.request的唯一区别在于get直接设置为get方式并且自动调用req.end()函数，
//本例中向这个地址发出get请求，返回的数据在回调函数中使用，
http.get("http://ent.news.cn/yy.htm",function(res){
var html = '';
var news = [];
res.setEncoding('utf-8');
//var chunks=[];
res.on('data',function(chunk){//当检测到data事件发生时，调用回调函数，获得请求服务器返回的数据
html += chunk;//html是该网页的源代码
//chunks.push(chunk);

});

//html = iconv.decode(Buffer.concat(chunks),'gb2312');
res.on('end',function(){//当end事件发生时，调用回掉函数
//console.log(html);
var $=cheerio.load(html);//cheerio模块的使用，首先需要加载html页面，
//console.log($('.dataList .clearfix'));
$('.dataList li').each(function(index,item){ //获取类dataList下的li并且对其中的每一项进行遍历

var news_item = {
title:$('h3',this).text(),//显示h3中的文字内容
time:$('.time',this).text(),//显示类为time的元素中的文字内容
link:$('a',this).attr('href'),//显示a中属性为href的内容
};
news.push(news_item);//将每一个news_item放入news对象中
});
console.log(news);//输出news的内容

});
}).on('error',function(err){
console.log(err);//如果发生错误则打印错误

});
