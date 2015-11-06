var mongodb = require('./db'),
markdown = require('markdown').markdown;

function Post(name, title, post, tags) {
  this.name = name;
  this.title = title;
  this.tags = tags;
  this.post = post;
  
}

module.exports = Post;

//存储一篇文章及其相关信息
Post.prototype.save = function(callback) {
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
  //要存入数据库的文档
  var post = {
      name: this.name,
      time: time,
      title: this.title,
      tags:this.tags,
      post: this.post,
      comments: []
  };
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    //读取 posts 集合
    db.collection('posts', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      //将文档插入 posts 集合
      collection.insert(post, {
        safe: true
      }, function (err) {
        mongodb.close();
        if (err) {
          return callback(err);//失败！返回 err
        }
        callback(null);//返回 err 为 null
      });
    });
  });
};

//读取文章及其相关信息
Post.getTen = function(name, page, callback){
  mongodb.open(function (err, db){
    if(err){
      return callback(err);
    }
    //
    db.collection('posts',function (err, collection){
      if(err){
        mongodb.close();
        return callback(err);
      }
      var query = {};
      if(name){
        query.name = name;
      }
      //使用count 返回特定查询的文档数total
      collection.count(query, function (err, total){
        //根据query对象查询，并跳过前(page-1)*10个结果，返回之后的结果
        collection.find(query,{
          skip: (page-1)*10,
          limit:10
          //从第 （page-1）*10条开始返回，返回十条
          // 相当于mysql中的limit((page-1)*10,10)
          // 对MongoDB来说，skip的大小严重影响性能，应该严格避免特别大的skip操作。
        }).sort({
          time: -1
        }).toArray(function (err, docs){
          mongodb.close();
          if(err){
            return callback(err);
          }
          //解析markdown 为html
          docs.forEach(function (doc){
            doc.post = markdown.toHTML(doc.post);
          });
          callback(null, docs, total)
        });
      });
    });
  });
};
// Post.getAll = function(name, callback) {
//   //打开数据库
//   mongodb.open(function (err, db) {
//     if (err) {
//       return callback(err);
//     }
//     //读取 posts 集合
//     db.collection('posts', function(err, collection) {
//       if (err) {
//         mongodb.close();
//         return callback(err);
//       }
//       var query = {};
//       if (name) {
//         query.name = name;
//       }
//       //根据 query 对象查询文章
//       collection.find(query).sort({
//         time: -1
//       }).toArray(function (err, docs) {
//         mongodb.close();
//         if (err) {
//           return callback(err);//失败！返回 err
//         }
//         //解析markdown为html
//         //console.log('yeah')
//         docs.forEach(function (doc){
//           doc.post = markdown.toHTML(doc.post);
//         });
//         callback(null, docs);//成功！以数组形式返回查询的结果
//       });
//     });
//   });
// };

//获取一篇文章
Post.getOne = function(name, day, title, callback){
  //打开数据库
  mongodb.open(function (err ,db){
    if(err){
      return callback(err);
    }
    db.collection('posts', function (err, collection){
      if(err){
        mongodb.close();
        return callback(err);
      }

      //根据用户名，发表日期及文章名进行查询
      collection.findOne({
        "name":name,
        "time.day": day,
        "title" : title
      },function(err, doc){
        mongodb.close();
        if(err){
          return callback(err);
        }
        // 解析markdown为html
        if(doc){
          doc.post = markdown.toHTML(doc.post);
          doc.comments.forEach(function (comment){
            comment.content = markdown.toHTML(comment.content);
          });
        }
        // doc.post = markdown.toHTML(doc.post);
        callback(null,doc);
      });
    });
  });
};
Post.edit = function( name , day, title, callback){
  //打开数据库
  mongodb.open(function (err,db){
    if(err){
      return callback(err);
    }
    //
    db.collection('posts', function (err, collection){
      if(err){
        mongodb.close();
        return callback(err);
      }
      collection.findOne({
        "name":name,
        "time.day":day,
        "title": title
      },function (err,doc){
        mongodb.close();
        if(err){
          return callback(err);
        }
        callback(null,doc);//返回查询的一篇文章<markdown>格式
      });
    });
  });
};
Post.update = function(name, day, title, post, callback){
  mongodb.open(function (err,db){
    if(err){
      return callback(err);
    }
    db.collection('posts',function (err,collection){
      if(err){
        mongodb.close();
        return callback(err);
      }
      //更新文章内容
      collection.update({
        "name":name,
        "time.day":day,
        "title": title
      },{
        $set:{post:post}
      },function(err){
        mongodb.close();
        if(err){
          return callback(err);
        }
        callback(null);
      });
    });
  });
};
Post.remove = function(name, day, title, callback){
  mongodb.open(function (err,db){
    if(err){
      return callback(err);
    }
    db.collection('posts',function (err,collection){
      if(err){
        mongodb.close();
        return callback(err);
      }
      collection.remove({
        "name":name,
        "time.day":day,
        "title":title
      },{
        w:1
      },function(err){
        mongodb.close();
        if(err){
          return callback(err);
        }
        callback(null);
      });
    });
  });
};
Post.getArchive = function(callback){
  mongodb.open(function (err, db){
    if(err){
      return callback(err);
    }
    db.collection('posts',function (err, collection){
      if(err){
        mongodb.close();
        return callback(err);
      }
      //返回只包含name,time,title属性的文档组成的存档数组
      collection.find({},{
        "name":"1",
        "time":"1",
        "title":"1"
      }).sort({
        time:-1
      }).toArray(function (err, docs){
        mongodb.close();
        if(err){
          return callback(err);
        }
        callback(null, docs);
      });
    });
  });
};
Post.getTags = function(callback){
  mongodb.open(function (err, db){
    if(err){
      return callback(err);
    }
    db.collection('posts', function (err, collection){
      if(err){
        mongodb.close();
        return callback(err);
      }
      //distinct 用来找出给定键的所有不同值
      collection.distinct('tags',function (err, docs){
        mongodb.close();
        if(err){
          return callback(err);
        }
        callback(null, docs);
      });
    });
  });
};
Post.getTag = function (tag, callback){
  mongodb.open(function (err, db){
    if(err){
      return callback(err);
    }
    db.collection('posts', function (err, collection){
      if(err){
        mongodb.close();
        return callback(err);
      }
      //查询所有tags数组内包含tag的文档
      //并返回只含有 name.,time, title 组成的数组
      collection.find({
        "tags":tag
      },{
        "name": 1,
        "time": 1,
        "title":1
      }).sort({
        time: -1
      }).toArray(function (err,docs){
        mongodb.close();
        if(err){
          return callback(err);
        }
        callback(null, docs);
      });
    });
  });
};