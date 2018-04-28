var fs = require('fs');
var path = require('path');
var async = require('async')
//解析需要遍历的文件夹，我这以E盘根目录为例  
var filePath = path.resolve('./protobuf');
var exec = require('child_process').exec;
var pkgName = process.env.NAME
//调用文件遍历方法  
fileDisplay(filePath);
/** 
 * 文件遍历方法 
 * @param filePath 需要遍历的文件路径 
 */
function fileDisplay(filePath) {
    //根据文件路径读取文件，返回文件列表  
    fs.readdir(filePath, function (err, files) {
        if (err) {
            console.warn(err)
        } else {
            //遍历读取到的文件列表  
            files.forEach(function (filename) {
                //获取当前文件的绝对路径  
                var filedir = path.join(filePath, filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象  
                fs.stat(filedir, function (eror, stats) {
                    if (eror) {
                        console.warn('获取文件stats失败');
                    } else {
                        var isFile = stats.isFile(); //是文件  
                        var isDir = stats.isDirectory(); //是文件夹  
                        if (isFile) {
                            if (filedir.indexOf('.proto') != -1) {
                                var name = filedir.slice(0, filedir.lastIndexOf('.'));
                                // sed -i '' -e '2c \
                                // test' Account.proto
                                var cmdBeforeStr = `sed -i '' -e '2c \\ \n package ${pkgName};' ${name}.proto`;
                                var cmdStr = `pbjs -t static-module -w commonjs -o ${name}.js ${name}.proto`;
                                // console.log(cmdStr)
                                if(pkgName) {
                                    cmdBefore(cmdBeforeStr) 
                                    
                                }else {
                                    cmdCurrent(cmdStr) 
                                    
                                }
                            }
                             
                        }
                        if (isDir) {
                            fileDisplay(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件  
                        }
                    }
                })
            });
        }
    });
}
function cmdBefore(str) {
    exec(str, function (err, stdout, stderr) {
        if (err) {
            console.log('exec error' + stderr);
        } else {
            console.log('1')
        }
    });
}
function cmdCurrent(str) {
    console.log('------')
    exec(str, function (err, stdout, stderr) {
        if (err) {
            console.log('exec error' + stderr);
        } else {
            console.log('success');
        }
    });
}