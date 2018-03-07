#! /bin/bash
#@authorr qianchuan  2015-10-01
# 自动打包上传到代码仓库

echo "push start"                      # 开始构建
# npm run build                           # webpack构建到dist目录
# echo "build end"                        # 构建结束

pack_time=$(date +%Y-%m-%d-%H-%M-%S)    # 构建时间
pack_name=build-$pack_time              # 压缩包名称

git add -A 
git commit -am "$pack_name"
git pull origin master
git push origin master                  # 提交
echo "push end"  

