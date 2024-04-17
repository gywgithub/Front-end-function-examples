console.log('node server')

let WebSocketServer = require('ws').Server;
let wss = new WebSocketServer({ port: 9000 });

let clients = [];

wss.on('connection', (ws) => {
    console.log(ws)
    clients.push(ws);

    ws.on('message', (message) => {
        console.log('received: %s', message);
        // 在这里处理接收到的消息

        // ws.send(JSON.stringify({
        //     rend: 8090,
        //     msg: '8090 client',
        //     receive: 'test string'
        // }));
        console.log(typeof message)
        console.log(typeof JSON.stringify(message))

        // 注意！！！
        // 这里面的数据要使用 toString() 转成字符串
        // 否则客户端接收的是个 blob 对象，将无法正确解析数据
        console.log(message.toString())
        // ws.send(message.toString())

        broadcast(message.toString())
    });


});

function broadcast(message) {
    clients.forEach(function (client) {
        client.send(message);
    });
}