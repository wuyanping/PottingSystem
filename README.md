# PottingSystem
盆栽前端

前端 webpack^3.6.0 + vue + vue-router + element-ul

# 安装
npm install --save-dev

# 配置env.js
在根目录下新建一个env.js文件
根据env.example.js的内容，进行配置（可复制env.example.js到env）

# 本地启动（开发环境下） (可访问pc端和移动端)
npm run dev

# build （生产环境build,移动端和pc端分开打包）
打包移动端：npm run build:mobile 
打包pc端：npm run build:pc
