var later=require('later');

var https=require('https');


var appid="wx48309e52143c450e";

var appsecret="973a400edb0d6571f2fe262dd5b56260";

var access_token;


later.date.localTime();

console.log("Now"+new Date());


var sched=later.parse.recur().every(1).hour();

next=later.schedule(sched).next(10);
console.log(next);

var timer=later.setInterval(test，sched);

setTimeout(test,2000);
//以上与timingAcquisition.js文件一致，此处不再注释

function test(){

	console.log(new Date());

	var options={

		hostname:'api.weixin.qq.com',//域名

		path:'/cgi-bin/token?grant_type=client_credential&appid='+appid+'&secret='+appsecret//请求路径

  };


  var req=https.get(options,function(res){//与http.request类似，http.get将请求方式设为get并且结束时自动调用end()函数

    			var bodyChunks='';

    			res.on('data',function(chunk){

    			bodyChunks+=chunk;//当data事件发生时，调用匿名函数，返回相应的请求值


			});

			res.on('end',function(){//在end事件发生时

    			var body=JSON.parse(bodyChunks);//首先将服务器返回的数据转换为json格式


    			if(body.access_token){//如果成功返回了access_token 执行判断体内的代码


    				access_token=body.access_token;

            //设定menu即微信测试号下的菜单
      				var menu = {
                "button": [//包括三个按钮
                  {
                  "name": "welcome",//第一个按钮名称为welcome
                  "sub_button": [//welcome按钮包含5个子按钮
                      {
                          "type": "click",//菜单的相应动作类型
                          "name": "hello",
                          "key": "V1001_MY_ACCOUNT"//菜单key值用于消息接口推送
                      },
                      {
                          "type": "click",
                          "name": "this",
                          "key": "V1002_BID_PROJECTS"
                      },
                      {
                          "type": "click",
                          "name": "is",
                          "key": "V1003_RETURN_PLAN"
                      },
                      {
                          "type": "click",
                          "name": "guansiqi",
                          "key": "V1004_TRANS_DETAIL"
                      },
                      {
                          "type": "click",
                          "name": "zodiac",
                          "key": "V1005_REGISTER_BIND"
                      }
                    ]
                  },
                        {
                            "type": "view",
                            "name": "guanguan",//一级菜单guanguan
                            "url": "http://adviser.ss.pku.edu.cn/wx/"//网页链接，用户点击菜单可以打开链接
                        },
                        {
                          "name": "menu2",//一级菜单menu2包含3个二级子菜单
                          "sub_button": [
                          {
                              "type": "view",
                              "name": "help",
                              "url": "http://adviser.ss.pku.edu.cn/wx/bszn/"
                          },
                          {
                              "type": "click",
                              "name": "change",
                              "key": "V1001_GOOD"
                          },
                          {
                              "type": "view",
                              "name":"tryagain",
                              "url": "http://www.ss.pku.edu.cn/"
                          }
                        ]
                      }
                    ]
                  };

              var post_str = new Buffer(JSON.stringify(menu));//转换menu为json字符串并赋值给post_str作为缓冲数据
              //var post_str = JSON.stringify(menu);
              console.log(post_str.toString());
              console.log(post_str.length);

                var post_options = {
                    host: 'api.weixin.qq.com',
                    port: '443',
                    path: '/cgi-bin/menu/create?access_token=' + access_token,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Content-Length': post_str.length
                    }

                };
                var post_req = https.request(post_options, function (response) {//由于生成菜单需要access——token，
                  //再次发送请求更新目录
                    var responseText = [];
                    var size = 0;
                    response.setEncoding('utf8');
                    response.on('data', function (data) {
                        responseText.push(data);
                        size += data.length;
                    });
                    response.on('end', function () {
                        console.log(responseText);
                    });
                  });

            // post the data
                      post_req.write(post_str);
                      post_req.end();





				          //post_options.path: '/cgi-bin/menu/create?access_token=' + access_token,
				            console.log(access_token);

			          }else{

				            console.dir(body);

			               }

			      });

          });


			       req.on('error',function(e){

					          console.log('ERROR:'+e.message);

                  });



        }
