var fs = require('fs')
//遍历文件夹，获取文件夹里面的所有信息
function getFileList(path){
	var filesList = [];
	readFile(path,filesList);
	return filesList;
}

//遍历读取文件
function readFile(path,filesList){
	files = fs.readdirSync(path);//需要同步读取
	files.forEach(walk);
	function walk(file){
		states = fs.statSync(path+'/'+file);
		if(states.isDirectory()){
			readFile(path+'/'+file, filesList);
		}
		else{
			//创建一个对象保存信心
			var obj = {};
			obj.size = states.size;
			obj.name = file;
			obj.path = path+'/'+file//文件绝对路径
			obj.mtime = states.mtime//文件修改时间
			filesList.push(obj);
		}
	}
}

//写入文件utf-8格式
function writeFile(fileName, data){
	fs.writeFile(fileName, data, 'utf-8', complete);
	function complete()
	{
		console.log('文件生成成功');
	}
}
/***
process是一个全局对象，argv返回的是一组包含命令行参数的数组。
第一项为”node”，
第二项为执行的js的完整路径，
后面是附加在命令行后的参数
***/
if (args.length < 2) {
    console.log("传入的参数有误");
    return ;
}

var executePath = process.argv.splice(2)+'';
console.log(executePath)
var filesList = getFileList(executePath);

// filesList.sort(sortHandler);
filesList.sort(sortByMtime)
function sortHandler(a, b){
	if(a.size > b.size){
		return -1;
	}else if(a.size < b.size){
		return 1;
	}else{
		return 0;
	}
}
//根据修改时间排序
function sortByMtime(a,b){
	if(a.mtime > b.mtime){
		return 1;
	}else if(a.mtime < b.mtime){
		return -1;
	}else{
		return 0;
	}
}



var str = '';
for(var i=0,len = filesList.length;i<len;i++){
	var item = filesList[i];
	var desc = "文件名"+item.name+" "
	// +"大小："+(item.size/1024).toFixed(2)+'/kb'+" "
	// +"路径："+item.path
	+"文件修改时间"+item.mtime;
	str+=desc+'\n'
}
writeFile('FileSizeSorted.txt',str);



