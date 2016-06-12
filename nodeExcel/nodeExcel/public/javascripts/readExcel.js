var xlsx  = require("node-xlsx");
var fs = require('fs');

function Excel(excel){
  this.name = excel.name;
};

module.exports = Excel;

Excel.merge = function(){
  console.log('Started to mixed excels!__________')
  var totalData = [];

  for(var i=0;i<filesListMerge.length;i++){
    totalData.push(filesListMerge[i].path)
    var list = xlsx.parse(filesListMerge[i].path)
    for(a in list){
      for(var q=0;q<list[a].data.length;q++){
        totalData.push(list[a].data[q])
      }
    }
  }

  // 构造生成xls需要的格式
  tempObj.name = 'mixed';
  tempObj.data = totalData;
  var tempFile = xlsx.build([tempObj])
  fs.writeFileSync('merged.xlsx', tempFile, 'binary',function(err){
    if(err){
      console.log(err)
    }
  })
  console.log('mixed.xlsx is created!  __________')





  // var unMergedData = [];
  // for(var i=0;i<filesListMerge.length;i++){
  //   var list = xlsx.parse(filesListMerge[i].path)
  //   for(a in list){
  //     for(var q=0;q<list[a].data.length;q++){
  //       unMergedData.push(list[a].data[q])
  //     }
  //   }
  // }
  // for(var i=0;i<filesListMerge.length;i++){
  //   var list = xlsx.parse(filesListMerge[i].path)
  //   for(i in list){
  //     for(j in obj){
  //       var tempObj = {};
  //       var tempData = [];
  //       tempData.push(['面积','房号','购买日期/预售号','单元','楼层','买受人','电话','项目名称','栋'])
  //       var tempName = '';
  //       for(var m=0;m<data.length;m++){
  //         tempName = j
  //         if(j == list[i].data[m][word]){
  //           tempData.push(list[i].data[m])
  //         }
  //       }
  //       var strTempName = tempName;
  //       for(var ii=0;ii<strTempName.length;ii++){
  //         strTempName = strTempName.replace(/[^\u4e00-\u9fa5a-zA-Z]/,'')
  //       }
  //       console.log(strTempName)
  //       //构造生成xls需要的格式
  //       tempObj.name = tempName;
  //       tempObj.data = tempData;
  //       var tempFile = xlsx.build([tempObj])
  //       if(tempName === 'undefined'){
  //         break;
  //       }
  //       fs.writeFileSync('MergedOutput/'+name+'/'+strTempName+'.xlsx', tempFile, 'utf-8',function(err){
  //         if(err){
  //           console.log(err)
  //         }
  //       });
  //       // fs.writeFileSync(tempName+'.xlsx', tempFile, 'binary');
  //     }
  //   }
  // }
  // var mergeObj = {};
  // mergeObj.name = 'test';
  // mergeObj.data = unMergedData;
  // var tempFile = xlsx.build([mergeObj])
  // fs.writeFileSync('test.xlsx', tempFile, 'binary',function(err){
  //   if(err){
  //     console.log(err)
  //   }
  // })
}

Excel.mix = function(){
  console.log('Started to mixed excels!__________')
  var totalData = [];

  for(var i=0;i<filesList.length;i++){
    var list = xlsx.parse(filesList[i].path)
    for(a in list){
      for(var q=0;q<list[a].data.length;q++){
        totalData.push(list[a].data[q])
      }
    }
  }

  // console.log(totalData)

  //构造生成xls需要的格式
  tempObj.name = 'mixed';
  tempObj.data = totalData;
  var tempFile = xlsx.build([tempObj])
  fs.writeFileSync('mixed.xlsx', tempFile, 'binary',function(err){
    if(err){
      console.log(err)
    }
  })
  console.log('mixed.xlsx is created!  __________')
}

Excel.start = function(val){
  var time = new Date().getTime();
  var totalData = [];
  for(var i=0;i<filesList.length;i++){
    // var list = xlsx.parse(filesList[i].path)
    parseExcel(val,filesList[i].path,filesList[i].name)
  }
  var newTime = new Date().getTime();
  console.log('Done!                   __________')
  console.log('耗时:'+(newTime-time)/1000+'秒')
  return (newTime-time)/1000
}
function parseExcel(word,path,name){
  var name = name.substring(0,name.indexOf('.'))
  var list = xlsx.parse(path);
  var obj = {};
  var data = [];
  for(i in list){
    data=list[i].data
  }
  for(var j=0;j<data.length;j++){
    obj[data[j][word]] = '1'
  }
  if (!fs.existsSync('Output/'+name)) {
    fs.mkdir('Output/'+name, 0777, function(err){
     if(err){
      console.log(err);
     }else{
      // console.log("creat done!");
     }
    })
  }else{
  }
  for(i in list){
    for(j in obj){
      var tempObj = {};
      var tempData = [];
      tempData.push(['面积','房号','购买日期(月/天/年 小时/分钟)','单元','楼层','买受人','电话','项目名称','栋'])
      var tempName = '';
      for(var m=0;m<data.length;m++){
        tempName = j
        if(j == list[i].data[m][word]){
          tempData.push(list[i].data[m])
        }
      }
      var strTempName = tempName;
      for(var ii=0;ii<strTempName.length;ii++){
        strTempName = strTempName.replace(/[^\u4e00-\u9fa5a-zA-Z]/,'')
      }
      //构造生成xls需要的格式
      tempObj.name = tempName;
      tempObj.data = tempData;
      var tempFile = xlsx.build([tempObj])
      if(tempName === 'undefined'){
        break;
      }
      fs.writeFileSync('Output/'+name+'/'+strTempName+'.xlsx', tempFile, 'utf-8',function(err){
        if(err){
          console.log(err)
        }
      });
      // fs.writeFileSync(tempName+'.xlsx', tempFile, 'binary');
    }
  }
}
//创建多层文件夹 同步
function mkdirsSync(dirpath, mode) {
    if (!fs.existsSync(dirpath)) {
        var pathtmp;
        dirpath.split(path.sep).forEach(function(dirname) {
            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname);
            }
            else {
                pathtmp = dirname;
            }
            if (!fs.existsSync(pathtmp)) {
                if (!fs.mkdirSync(pathtmp, mode)) {
                    return false;
                }
            }
        });
    }
    return true;
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
      //创建一个对象保存信息
      var obj = {};
      obj.size = states.size;
      obj.name = file;
      obj.path = path+'/'+file//文件绝对路径
      obj.mtime = states.mtime//文件修改时间
      filesList.push(obj);
    }
  }

}

// var executePath = process.argv.splice(2)+'';
var filesList = getFileList('./public/InExcel');
var filesListMerge = getFileList('./public/ExcelNeedMerge')
var tempObj = {};

function getFileList(path){
  var filesList = [];
  readFile(path,filesList);
  return filesList;
}







