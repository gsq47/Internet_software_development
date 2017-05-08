var Waterline=require('waterline');
var mysqlAdapter=require('sails-mysql');
var mongoAdapter=require('sails-mongo');

var adapters={
    mongo:mongoAdapter,
    mysql:mysqlAdapter,
    default:'mongo'
};

var connections={
    mongo:{
	adapter:'mongo',
        url:'mongodb://localhost/waterline-sample'
    },
    mysql:{
	adapter:'mysql',
	url:'mysql://root:@localhost/waterlinesample'
    }

};

var User=Waterline.Collection.extend({
    identity:'user',
    connection:'mysql',
    schema:true,
    attributes:{
	username:{
	    type:'string',
	    required:true
	},
	birthday:{
	    type:'date',
	    after:new Date('1900-01-01'),
	    before:function(){
	    return new Date();
	    }
	},
	createTime:{
	    type:'date'
	}
    },
    beforeCreate:function(value,cb){
	value.createTime=new Date();
	console.log('beforeCreate executed');
	return cb();
    }
});
var orm=new Waterline();

orm.loadCollection(User);
var config={
   adapters:adapters,
   connections:connections
}
orm.initialize(config,function(err,models){
    if(err){
	console.error('orm initialize failed',err)
        return;
    }

    models.collections.user.create({username:'Sid'},function(err,user){
	console.log('after user.create,err,user',err,user);
	
    });

});
