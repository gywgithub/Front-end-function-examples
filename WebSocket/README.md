## 说明

这是一个基于 websocket 通信的一个 Demo，实现功能

- iframe 之间互相通信
- 嵌套的 iframe 通信
- 客户端与服务端通信

## 运行方式

### 先运行 socket 服务端

在 SocketServer 目录中，执行 `npm install` 安装依赖，然后执行 `node server.js` 命令运行 socket 服务

### 运行 socket 客户端

#### 8090目录

在 8090 目录中的 index.html 页面是平台页，里面使用 iframe 指向了两个卡片页，分别是 http://localhost:8091 和 http://localhost:8092 

运行 8090 端口服务站点，执行命令 `http-server -p 8090`

#### 8091目录

这是 http://localhost:8091 的页面，运行 8091 端口服务站点执行命令 `http-server -p 8091`

#### 8092目录

这是 http://localhost:8092 的页面，运行 8091 端口服务站点执行命令 `http-server -p 8092`

## 安装 http-server

如果本地有 node 环境的话，执行 `npm i http-server -g` 全局安装即可

http-server 其他服务端程序也有类似的库，自行按需安装