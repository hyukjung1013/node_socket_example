const WebSocket = require('ws');

module.exports = (server) => {
    const socketServer = new WebSocket.Server({ server: server });

    socketServer.on('connection', (webSocket, req) => {
        
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('Client connected. : ', ip);    // localhost is described as '::1'.

        webSocket.on('message', (message) => {
            console.log(ip, ': ', message);
        });

        webSocket.on('error', (error) => {
            console.log('Error: ', error);
        });

        webSocket.on('close', () => {
            console.log('Client disconnected. : ', ip);
            clearInterval(webSocket.interval);
        });

        const interval = setInterval(() => {
            if (webSocket.readyState === webSocket.OPEN) {
                webSocket.send('Message from the Server.');
            }
        }, 3000);

        webSocket.interval = interval;
    });
}