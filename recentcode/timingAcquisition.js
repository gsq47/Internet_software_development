var later=require('later');//引用later模块
later.date.localTime();//设置使用本地时区
console.log("Now:"+new Date());//显示当前时间
var sched=later.parse.recur().every(5).second();//later.parse.recur()可以为创建时间表提供简单的可连接的api
//every(5).second() 在0秒 5秒 10秒 15.....55秒启动
next = later.schedule(sched).next(10);//later.schedule(schedule).next(count, start, end)
//计算时间计划表中接下来将依次启动的10个时间
console.log(next);//输出这10个时间
var timer=later.setInterval(test,sched);//setInterval函数，按照sched的时间表调用test函数，也就是说在本例中，每5s调用一次test函数
setTimeout(test,2000);//程序运行2s后将自动调用test函数一次
function test(){
console.log(new Date());
}
