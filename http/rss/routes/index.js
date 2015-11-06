var express = require('express');
var router = express.Router();
var User = require('../models/user.js'),
	crypto = require('crypto');
var Item = require('../models/item.js');
var fs = require('fs');
/* GET home page. */
 
module.exports = function(app){

	app.get('/',function(req,res){
		Item.get(null,function (err,items){
			if(err){
				items = [];
			}
			res.render('index', {
				title:'主页',
				user: req.session.user,
				items:items,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		});
	});
	app.get('/reg', checkNotLogin);
	app.get('/reg',function(req,res){
		 res.render('reg',{
		 	title:'注册',
		 	user: req.session.user,
		 	success:req.flash('success').toString(),
		 	error: req.flash('error').toString()
		 });
		// res.render('reg',{
		// 	title:"注册"
		// });
	});
	app.post('/reg', checkNotLogin);
	app.post('/reg',function(req,res){
		var name = req.body.name,
			password = req.body.password,
			password_re = req.body['password-repeat'],
			role= req.body.role;
		if(password!=password_re){
			req.flash('error','两次输入的密码不一致');
			return res.redirect('/reg');
		}

		var newUser = new User({
			name:name,
			password:password,
			email:req.body.email,
			role:req.body.role
		});
		User.get(newUser.name,function (err,user){
			if (err) {
				req.flash('error',err);
				return res.redirect('/')
			};
			if (user) {
				req.flash('error','用户已存在');
				return res.redirect('/reg');
			}
			newUser.save(function (err,user){
				if(err){
					req.flash('error',err);
					return res.redirect('/reg');
				}
				req.session.user = user;
				//我们把用户信息存储在了 session 里，
				// 以后就可以通过 req.session.user 读取用户信息。
				req.flash('success','注册成功');
				res.redirect('/');
			});
		});
	});
	app.get('/reg', checkLogin);
	app.get('/login',function(req,res){
		res.render('login',{
			title:'注册',
			user:req.session.user,
			success: req.flash('success').toString(),
			error:req.flash('error').toString()
		}) ;
			 
		 
	});
	app.post('/reg', checkLogin);
	app.post('/login',function(req,res){
		var md5 = crypto.createHash('md5'),
			// password = md5.update(req.body.password).digest('hex');

		 	password = req.body.password;
		 
		User.get(req.body.name,function (err,user){
		 	
			if(!user){
				req.flash('error','用户不存在!');
				return res.redirect('/login');
			}
			if(user.password != password){
				req.flash('error','密码错误！');
				return res.redirect('/login');
			}
			req.session.user = user;
			req.flash('success','登录成功!');
			res.redirect('/');
		});
	});
	app.get('/sell', checkLogin);
	app.get('/sell',function(req,res){
		 
		res.render('sell', {
			title:'sell',
			user:req.session.user,
			item: req.session.item,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});
	app.post('/sell', checkLogin);
	app.post('/sell',function(req,res){
		var pic = null;
		var currentUser = req.session.user,
			item = new Item(currentUser.name,req.body.id,req.body.price,req.body.date,req.body.number,req.body.img,req.body.description);
		// for(var i in req.files){
		// 	if(req.files[i] == 0){
		// 		fs.unlinkSync(req.files[i].path);
		// 		console.log('success removed an empty file');
		// 	} else {
		// 		var path = './public/img' +req.files[i].name;
		// 		//使用同步方式重命名一个文件
		// 		fs.renameSync(req.files[i].path,path);
		// 		console.log('success renamed a file');
		// 	}
		// 	pic = req.files[i].name;
			
		// }
		item.save(function (err){
			if (err){
				req.flash('error',err);
				return res.redirect('/');
			}
			else if(item.id == null || item.price == null || item.img == null || 
				item.number == null || item.description== null){
				req.flash('error','信息错误');
				return res.redirect('/sell')
			}

			req.flash('success','添加成功！');
			res.redirect('/');
		})
		 
	});
	app.get('/item',function(req,res){
		res.render('item',{title:'item'})
	});
	app.post('/item',function(req,res){
		res.render('item',{title:'item'})
	});
	app.get('/logout', checkLogin);
	app.get('/logout',function(req,res){
		req.session.user = null;
		req.flash('success','登出成功！');
		res.redirect('/')
	});
	function checkLogin(req,res,next){
		if(!req.session.user){
			req.flash('error','未登录！');
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

