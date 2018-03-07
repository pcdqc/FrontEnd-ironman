var path = require('path');

//引入html-webpack-plugin模块
var htmlWebpackPlugin = require('html-webpack-plugin');
var cleanWebpackPlugin = require('clean-webpack-plugin');
var extractTextPlugin = require('extract-text-webpack-plugin');

let extractCSS = new extractTextPlugin('css/[name]-one.css');
let extractLESS = new extractTextPlugin('css/[name]-two.css');

module.exports = {
    entry: path.resolve(__dirname, './src/js/app.js'), //指定打包入口文件
    //配置路径用path.resolve()处理，是为了确保路径是从根目录开始绝对定位到指定位置，webpack3.0要求我们在配置路径相关的时候使用绝对路径；
    output:{
        path: path.resolve(__dirname, './dist'), //指定打包后js 文件放置的位置
        filename: 'js/bundle-[chunkhash:9].js' //指定打包后的js名称，这个就是index.html 最终引入的js的名称
                //[hash]为编译时填写hash的占位符，也可以填写chunkhash 
                // hash每使用wepack就会变化一次 chunkhash只有对应的模块变化了 才会变化
    },
    module: {
        rules: [{
            test: /\.css$/, //匹配所有css文件
            use: extractCSS.extract([
                // { loader: 'style-loader' },
                { loader: 'css-loader',options: {importLoaders:1} }, //webpack中loader的解析是从右往左的顺序进行的
                                                //importLoader 解决由于css-loader处理文件导入的方式导致postcss-loader不能正常使用的问题
                { loader: 'postcss-loader'}
            ]),//指定加载器
            exclude: /node_modules/ //排除对node_module文件夹下面的所有资源的匹配
        },{
            test: /\.less$/,
            use: extractLESS.extract([
                // { loader: 'style-loader'},
                { loader: 'css-loader',options: {importLoaders:1} },
                { loader: 'postcss-loader'},
                { loader: "less-loader"} //最先加载less loader 预处理
            ])
        },{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    //初始化插件
    plugins:[
        new htmlWebpackPlugin({
            template: 'index.html', //定义插件读取的模版文件是根目录下的index.html
            filename: 'index.html' //定义通过模块文件新生成的页面名称
        }),
        new cleanWebpackPlugin(
            ['dist'],  //匹配dist
            {
                root: __dirname, //制定插件根目录位置
                verbose: true, //开启控制台输出信息
                dry: false //启用删除文件
            }
        ),
        extractCSS,
        extractLESS
    ],
    
    
}