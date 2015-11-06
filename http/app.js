var express = require('express');
var app = express();
app.get('/',function(req,res){
	res.render('register');
});

app.set('view engine','html');
app.engine('.html',require('ejs').__express);
//使用engine函数注册模板引擎并制定处理后缀名为html的文件

app.set('views',require('path').join(__dirname,'views'));
//设定试图存放的目录

// 如果是在本地项目中，我们还要指定本地静态资源访问的路径
app.use(express.static(require('path').join(__dirname,'public')));


// console.log('success at 8082')
app.listen(8082)
