var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var settings = require('./settings');

var flash = require('connect-flash');

var users = require('./routes/users');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var multer = require('multer');

var app = express();
//生成一个express实例APP

app.set('port', process.env.PORT||3000)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
//设置views文件夹为存视图文件的目录，即存放模板文件的地方， /views
//__dirname为全局变量，储存当前正在执行的脚本所在目录
app.set('view engine', 'ejs');
//ejs 模板引擎的一种 可在此处改为jade等其他模板引擎

app.use(flash());




// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//设置public/favicon.ico为favicon图标
app.use(logger('dev'));
//加载日志中间件
app.use(bodyParser.json());
//加载解析json的中间件
app.use(bodyParser.urlencoded({ extended: false }));
//加载解析urlencoded请求体的中间件
app.use(cookieParser());
//     解析cookie
app.use(express.static(path.join(__dirname, 'public')));
//设置public文件夹为存放静态文件的目录。

app.use(session({
  secret:settings.cookieSecret,
  key:settings.db,//cookie name
  cookie:{maxAge:1000*60*60*24*30},//30days
  store: new MongoStore({
    db:settings.db,
    host:settings.host,
    port:settings.port
  }),

  resave:false,
  saveUninitialized:true
}));
 

app.use(multer({
  dest:'./public/images',
  rename:function(fieldname, filename){
    return filename;
  }
}));
// app.use('/', routes);
// //路由控制器
// app.use('/users', users);
//把路由控制器和实现路由功能的函数都放到 index.js 
//app.js 中只有一个总的路由接口。
routes(app);
//通过routes(app)调用了index.js到处的函数

app.listen(app.get('port'),function(){
  console.log('express server listening on port ' + app.get('port'));
});





// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handlers

// development error handler
// will print stacktrace 开发环境下的错误处理器，将错误信息渲染error模板并显示到浏览器



// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// production error handler  生产环境下的错误处理器，
// no stacktraces leaked to user



// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


module.exports = app;
//到处app实例供其它模板调用



//C:\Users\Dandelion\AppData\Roaming\npm\node_modules