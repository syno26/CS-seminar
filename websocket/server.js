// WebSocketのサーバの生成
let ws = require('ws')
var server = new ws.Server({port:5001});

// 接続時に呼ばれる
server.on('connection', ws => {
    // クライアントからのデータ受信時に呼ばれる
    ws.on('message', message => {
        console.log(message);

        // クライアントにデータを返信
        server.clients.forEach(client => {
            client.send(message);
        });
    });

    // 切断時に呼ばれる
    ws.on('close', () => {
        console.log('close');
    });
});