var MongoClient=require('mongodb').MongoClient;

//Connection URL

var url='mongodb://localhost:27017/mynode';//连接到mynode数据库
//Use connect method to connect to the Server

MongoClient.connect(url,function(err,db){//连接数据库
    if(err)throw err;
    console.log("Connected correctly to server");

  /*  db.collection('user').save({name:'wang',passwd:'12'},function(err,ret){//在mynode数据库中，找到user表向其中添加数据
	if(err)throw err;
	console.log(ret);

    });
  */
   /* db.collection('user').find({"name":"guan"}).toArray(function(err,list){//在user表中查找数据
	if(err)throw err;
	console.log(list);

    });*/
    db.collection('user').find().skip(1).limit(1).toArray(function(err,list){
	if(err)throw err;
	console.log(list);

    });
});
