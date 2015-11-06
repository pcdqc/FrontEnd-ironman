var express = require('express');
var router = express.Router();
var User =require('../models/user.js');
var Post=require('../models/post.js');
var Comment=require('../models/comment.js');
var crypto = require('crypto'),
    User = require('../models/user.js');
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;



//express 封装了多种 http 请求方式，我们主要只使用 get 和 post 两种，即 app.get() 和 app.post() 。

//app.get() 和 app.post() 的第一个参数都为请求的路径，
// 第二个参数为处理请求的回调函数，回调函数有两个参数分别是 req 和 res，
// 代表请求信息和响应信息 。 
// req.query： 处理 get 请求，获取 get 请求参数
// req.params： 处理 /:xxx 形式的 get 或 post 请求，获取请求参数
// req.body： 处理 post 请求，获取 post 请求体
// req.param()： 处理 get 和 post 请求，
// 但查找优先级由高到低为 req.params→req.body→req.query
 
module.exports = function(app){

	app.get('/',function(req,res){
		 //判断是否是第一页，并把请求的页数转换成number类型
		 var page = req.query.p ? parseInt(req.query.p) :1;
		 //查询并返回第page页的10篇文章
		 Post.getTen(null, page, function (err, posts, total){
		 	if(err){
		 		posts = [];
		 	}
		 	res.render('index',{
		 		title: '主页',
		 		posts: posts,
		 		page: page,
		 		// tags: tags,
		 		isFirstPage:(page-1) == 0,
		 		isLastPage: (page-1)*10 +posts.length == total,
		 		user:req.session.user,
		 		success:req.flash('success').toString(),
		 		error: req.flash('error').toString()
		 	});
		 });
		// Post.getAll(null, function(err,posts){
		// 	if(err){
		// 		posts = [];
		// 		// console.log(posts);
		// 	}
		// 	res.render('index', {
		//     title: '主页',
		//     posts:posts,
		//     user: req.session.user,
		//     success: req.flash('success').toString(),
		//     error: req.flash('error').toString()
		//  });
		// });
//接受两个参数，第一个是模板的名称，即 views 目录下的模板文件名，扩展名 .ejs 可选。
		//第二个参数是传递给模板的数据对象，用于模板翻译。
	});
	app.get('/text',function(req,res){
		 res.render('text',{tilte:'测试页面'})
		 
		});
	app.get('/reg', checkNotLogin);
	app.get('/reg',function(req,res){
		res.render('reg',{
			title:'注册',
			user: req.session.user,
			success:req.flash('success').toString(),
			//将成功的信息赋值给变量 success
			error: req.flash('error').toString()
			//将错误的信息赋值给变量 error
			//我们在渲染 ejs 模版文件时传递这两个变量来进行检测并显示通知

		});
	});
	app.post('/reg', checkNotLogin);
	app.post('/reg',function(req,res){
		var name = req.body.name,
		//req.body
		//就是POST请求信息解析过后的对象，例如我们要访问POST来的表单内的
		// name="password"域的值，只须访问req.body['password']或req.body.password即可
      password = req.body.password,
      password_re = req.body['password-repeat'];
	  //检验用户两次输入的密码是否一致
	  if (password_re != password) {
	    req.flash('error', '两次输入的密码不一致!'); 
	    return res.redirect('/reg');//返回注册页
	  }
	  //生成密码的 md5 值
	  var md5 = crypto.createHash('md5'),
	      password = md5.update(req.body.password).digest('hex');
	  var newUser = new User({
	      name: name,
	      password: password,
	      email: req.body.email
	  });
	  //检查用户名是否已经存在 

		// //User：在前面的代码中，我们直接使用了 User 对象。

		// // User 是一个描述数据的对象，即 MVC 架构中的模型。
		// // 前面我们使用了许多视图和控制器，这是第一次接触到模型。
		// // 与视图和控制器不同，模型是真正与数据打交道的工具，没有模型，
		// // 网站就只是一个外壳，不能发挥真实的作用，
		// // 因此它是框架中最根本的部分。
	  	User.get(newUser.name, function (err, user) {
		    if (err) {
		      req.flash('error', err);
		      return res.redirect('/');
		    }
		    if (user) {
		      req.flash('error', '用户已存在!');
		      return res.redirect('/reg');//返回注册页
		    }
		    //如果不存在则新增用户
		    newUser.save(function (err, user) {
		      if (err) {
		        req.flash('error', err);
		        return res.redirect('/reg');//注册失败返回主册页
		      }
		      req.session.user = user;//用户信息存入 session
		      req.flash('success', '注册成功!');
		      res.redirect('/');//注册成功后返回主页
		    });
	  });
	});
	app.get('/login', checkNotLogin);
	app.get('/login',function(req,res){
		res.render('login',{
			title:'登陆',
			user: req.session.user,
			success:req.flash('success').toString(),
			error:req.flash('error').toString()
		});
		
	});
	app.post('/login', checkNotLogin);
	app.post('/login',function(req,res){
		//生成密码的md5值
		var md5 = crypto.createHash('md5'),
			password = md5.update(req.body.password).digest('hex');
		//检查用户是否纯在
		//req.body.name:就是 POST 请求信息解析过后的对象，例如我们要访问 POST 
		// 来的表单内的 name="password" 域的值，
		// 只需访问 req.body['password'] 或 req.body.password 即可。
		User.get(req.body.name,function(err,user){
			if(!user){
				req.flash('error','用户不存在！');
				return res.redirect('/login');
			}
			if(user.password!= password){
				req.flash('error','密码错误!');
				return res.redirect('/login');
			}
			//用户名密码匹配后，将用户信息存入session
			req.session.user = user;
			req.flash('success','登录成功!');
			res.redirect('/');
		});
	});
	app.get('/post', checkLogin);
	app.get('/post',function(req,res){
		 res.render('post',{
		 	title:"发表",
		 	user:req.session.user,
		 	success:req.flash('success').toString(),
		 	error:req.flash('error').toString()
		 });
	});
	app.post('/post', checkLogin);
	app.post('/post',function(req,res){
		var currentUser = req.session.user,
		    tags = [req.body.tag1, req.body.tag2, req.body.tag3],
		    post = new Post(currentUser.name, req.body.title, tags, req.body.post);
		post.save(function (err) {
		    if (err) {
		      req.flash('error', err); 
		      return res.redirect('/');
		    }
		    req.flash('success', '发布成功!');
		    res.redirect('/');//发表成功跳转到主页
  });
	});
	app.get('/logout', checkLogin);
	app.get('/logout',function(req,res){
		req.session.user = null;
		//通过把 req.session.user 赋值 null 丢掉 session 中用户的信息，
		//实现用户的退出
		req.flash('success','登出成功！');
		res.redirect('/');
	});
	app.get('/upload',checkLogin);
	app.get('/upload',function (req,res){
		res.render('upload',{
			title:'文件上传',
			user:req.session.uesr,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});
	app.post('/upload',checkLogin);
	app.post('/upload',function(req,res){
		req.flash('success','文件上传成功！');
		res.redirect('/upload');
	});
	app.get('/archive', function (req,res){
		Post.getArchive(function (err, posts){
			if(err){
				req.flash('error',err);
				return res.redirect('/');
			}
			res.render('archive',{
				title:'存档',
				posts:posts,
				user:req.session.uesr,
				success:req.flash('success').toString(),
				error:req.flash('error').toString()
			});
		});
	});
	app.get('/tags', function (req,res){
		Post.getTags(function (err, posts){
			if(err){
				req.flash('error',err);
				return res.redirect('/')
			}
			res.render('tags',{
				title:'标签',
				posts: posts,
				user:req.session.user,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		});
	});
	app.get('/tags/:tag', function(req,res){
		Post.getTag(req.params.tag, function (err,posts){
			if(err){
				req.flash('error',err);
				return res.redirect('/');
			}
			res.render('tags',{
				title: 'TAG'+ req.params.tag,
				posts:posts,
				user:req.session.user,
				success:req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		});
	});
	//用来处理访问用户页的请求
	app.get('/u/:name',function (req, res){
		
		 var page = req.query.p ? parseInt(req.query.p) :1;
		 //检查用户名是否存在
		 User.get(req.params.name, function(err,user){
		 	if(!user){
		 		req.flash('error','用户不存在！');
		 		return res.redirect('/');
		 	}
		 	//查询并返回该用户第page 页的10篇文章
		 	Post.getTen(user.name, page, function(err, posts, total){
		 		if(err){
		 			req.flash('error',err);
		 			return res.redirect('/');
		 		}
		 		res.render('uesr',{
		 			title: uesr.name,
		 			posts: posts,
		 			page: page,
		 			isFirstPage: (page-1) == 0,
		 			isLastPage: ((page-1)*10 + posts.length) ==total,
		 			user: req.session.user,
		 			success: req.flash('success').toString(),
		 			error: req.flash('error').toString()
		 		});
		 	});
		 });
	});
	app.get('/u/:name/:day/:title', function (req, res){
		Post.getOne(req.params.name, req.params.day, req.params.title, function (err,post){
			if(err){
				req.flash('error',err);
				return res.redirect('/');
			}
			res.render('article',{
				title: req.params.title,
				post:post,
				user:req.session.user,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		});
	});
	app.post('/u/:name/:day/:title',function (req,res){
		var date = new Date(),
			time = date.getFullYear() + "-" +(date.getMonth() +1)+"-"+date.getDate()+" "+
				   date.getHours() +":"+(date.getMinutes()<10? '0' +date.getMinutes() : date.getMinutes());
		var comment = {
			name: req.body.name,
			email: req.body.email,
			website:req.body.website,
			time: time,
			content: req.body.content
		};
		var newComment = new Comment(req.params.name, req.params.day, req.params.title, comment);
		newComment.save(function (err){
			if(err){
				req.flash('error',err);
				return res.redirect('back');
			}
			req.flash('success','留言成功!');
			res.redirect('back');//成功返回到改文章页
		});
	});
	app.get('/edit/:name/:day/:title',checkLogin);
	app.get('/edit/:name/:day/:title',function(req,res){
		var currentUser = req.session.user;
		Post.edit(currentUser.name, req.params.day, req.params.title,function(err,post){
			if(err){
				req.flash('error',err);
				return res.redirect('back');
			}
			res.render('edit',{
				title:"编辑",
				post:post,
				user: req.session.user,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		});
	});
	app.post('/edit/:name/:day/:title',checkLogin);
	app.post('/edit/:name/:day/:title',function(req, res){
		var currentUser = req.session.user;
		Post.update(currentUser.name,req.params.day,req.params.title,req.body.post,function(err){
			var url = encodeURI('/u/'+req.params.name +'/'+req.params.day+'/'+req.params.title);
			if(err){
				req.flash('error',err);
				return res.redirect(url);
			}
			req.flash('success','修改成功!');
			res.redirect(url);
		});
	});
	app.get('/remove/:name/:day/:title',checkLogin);
	app.get('/remove/:name/:day/:title',function (req,res){
		var currentUser = req.session.user;
		Post.remove(currentUser.name,req.params.day,req.params.title,function(err){
			if(err){
				req.flash('error',err);
				return res.redirect('back');
			}
			req.flash('success','删除成功！');
			res.redirect('/')
		});
	});
	function checkLogin(req,res,next){
		if(!req.session.user){
			req.flash('error','未登陆！');
			res.redirect('/login');
		}
		next();
	}
	function checkNotLogin(req,res,next){
		if(req.session.user){
			req.flash('error','已登录！');
			res.redirect('back');
		}
		next();
	}
};
