var xlsx  = require("xlsx");
var fs = require('fs');

function Excel(excel){
  this.name = excel.name;
};

module.exports = Excel;
var time = new Date().getTime();
// Excel.mix = function(){
  console.log('Started to mixed excels!__________')
  var totalData = [];

  // for(var i=0;i<filesList.length;i++){
    var list = xlsx.readFile('../InExcel/1.xls')
    var sheets = list.Sheets
    console.log('Sheets_______')
    for(i in sheets){
      for(j in sheets[i])
      {
        console.log(sheets[i][j])
      }
    }

  // }

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
// }
// Excel.split = function(){
//   console.log('Started to split!       __________')
//   parseExcel(7)
//   function parseExcel(word){
//     var list = xlsx.parse("./mixed.xlsx");
//     var obj = {};
//     var data = [];
//     for(i in list){
//       data=list[i].data
//     }
//     for(var j=0;j<data.length;j++){
//       obj[data[j][word]] = '1'
//     }
//     for(i in list){
//       for(j in obj){
//         var tempObj = {};
//         var tempData = [];
//         tempData.push(['面积','房号','购买日期','单元','楼层','买受人','电话','项目名称','栋'])
//         var tempName = '';
//         for(var m=0;m<data.length;m++){
//           tempName = j
//           if(j == list[i].data[m][word]){
//             console.log(list[i].data[m][2])
//             // var tempTime = list[i].data[m][2]+''
//             // console.log(typeof tempTime)
//             // if(tempTime.indexOf('-') != -1){
//             //   tempTime = new Date("'"+tempTime+"'")
//             // }else{
//             //   tempTime = '暂无'
//             // }
//             tempData.push(list[i].data[m])
//           }
//         }
//         //构造生成xls需要的格式
//         tempObj.name = tempName;
//         tempObj.data = tempData;
//         // console.log('---------tempData')
//         var tempFile = xlsx.build([tempObj])
//         // console.log(tempName)
//         fs.writeFileSync('Output/'+tempName+'.xlsx', tempFile, 'utf-8',function(err){
//           if(err){
//             console.log(err)
//           }
//         });
//         // fs.writeFileSync(tempName+'.xlsx', tempFile, 'binary');
//       }
//     }
//   }

//   var newTime = new Date().getTime();
//   console.log('Done!                   __________')
//   console.log('耗时:'+(newTime-time)/1000+'秒')
// }


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
var tempObj = {};

function getFileList(path){
  var filesList = [];
  readFile(path,filesList);
  return filesList;
}








