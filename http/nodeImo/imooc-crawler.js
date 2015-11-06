var http = require('http'); 
var url = require('url').parse('http://www.infoq.com/cn/articles/nodejs-about-buffer');
var iconv = require('iconv-lite'); 
var BufferHelper = require('bufferhelper');
http.get(url,function(res){
  var bufferHelper = new BufferHelper();
  res.on('data', function (chunk) {
    bufferHelper.concat(chunk);
  });
  res.on('end',function(){ 
    console.log(iconv.decode(bufferHelper.toBuffer(),'utf8'));
  });

}).on('error',function(){
	console.log('获取课程数据失败!')
})

//爬虫代码crawler
//这个可获取nodejs无法识别的utf8 gbk 字符类型
//利用 iconv-lite and  bufferhelper