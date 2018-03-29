function HTMLPlugin(options){
  // options是配置文件，你可以在这里进行一些与options相关的工作
}

// 每个plugin都必须定义一个apply方法，webpack会自动调用这个方法
HTMLPlugin.prototype.apply = function(compiler){
    // apply方法中会传入Compiler的实例compiler
    // 'emit'是该插件监听的事件，插件工作的逻辑在回调函数中
    compiler.plugin('emit', function(compilation, callback){
        // 回掉函数有两个参数
        // compilation和下一个回调函数，callback可以不传
        // 同步事件不传callback
        compilation.chunks.forEach(function(chunk){
            console.log('chunk.name', chunk.name);
            console.log('=====================================');
            //console.log('chunk.modules', chunk.modules.length);

            chunk.modules.forEach(function(module){
                console.log('module', module.resource);
                module.fileDependencies.forEach(function(filepath){
                    //console.log('filepath', filepath);
                });
            });

            chunk.files.forEach(function(filename){
                let source = compilation.assets[filename].source();
                //console.log('file', source);
            })
        });
        // 最后调用callback
        callback();
    });
}

module.exports = HTMLPlugin;