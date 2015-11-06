var mongodb = require('./db');

function Item(name,id,price,date,number,img,description){
	this.name = name;
	this.id = id;
	this.price = price;
	this.date = date;
	this.number = number;
	this.img =img;
	this.description = description;
};

module.exports = Item;

Item.prototype.save = function(callback){
	var date = new Date();
  //存储各种时间格式，方便以后扩展
  	var time = {
      date: date,
      year : date.getFullYear(),
      month : date.getFullYear() + "-" + (date.getMonth() + 1),
      day : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
      minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
      date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) 
  	}
	var item = {
		id: this.id,
		time:time,
		price: this.price,
		date: this.date,
		number: this.number,
		img:this.img,
		description: this.description
	}
	mongodb.open(function (err,db){
		if(err){
			return callback(err)
		}
		db.collection('items',function (err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.insert(item,{
				safe:true
			},function (err){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null);
			});
		});
	});
};
Item.get = function(id,callback){
	mongodb.open(function (err,db){
		if(err) {return callback(err);}
		db.collection('items',function (err,collection){
			if(err){mongodb.close();return callback(err)};
			var query = {};
			if(id){
				query.id = id;
			}
			//根据query对象查询文章
			collection.find(query).sort({
				time:-1
			}).toArray(function(err,items){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null,items)
			})
		});
	});
};
Item.remove = function(id,callback){
	mongodb.open(function (err,db){
		if(err){return callback(err);}
		db.collection('items',function (err,collection){
			if(err){mongodb.close();return callback(err)};
			collection.remove({
				id:id
			},function (err,item){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null,item);
			});
		});
	});
};
Item.update = function(id,callback){
	mongodb.open(function (err,db){
		if(err){return callback(err);}
		db.collection('items',function (err,collection){
			if(err){mongodb.close();return callback(err)};
			collection.update({
				id:id
			},function (err,item){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null,item);
			});
		});
	});
};

 