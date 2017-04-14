# Grunt

1. 安装nodejs及npm
```
# 源码安装
cd /usr/local
git clone https://github.com/nodejs/node.git
cd node && ./configure && make
make install
node -v
# 包管理器安装
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs
ln -s /usr/bin/nodejs /usr/sbin/node
node -v
```

1. 安装grunt
```
npm install -g grunt-cli
```

1. 创建package.json文件
```
cd /var/www/html
npm init
```

1. 向package.json文件中添加grunt插件
```
npm install grunt --save-dev
npm install grunt-contrib-clean --save-dev
npm install grunt-contrib-concat --save-dev
npm install grunt-contrib-copy --save-dev
npm install grunt-contrib-mincss --save-dev
npm install grunt-contrib-uglify --save-dev
npm install grunt-contrib-watch --save-dev
```

1. 创建Gruntfile.js文件

1. 运行
```
grunt
```