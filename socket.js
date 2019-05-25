const SocketIO = require('socket.io');

module.exports = (server) => {

    const io = SocketIO(server, { path: '/socket.io' });

    io.on('connection', (socket) => {
        const request = socket.request;
        const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
        console.log('Client connected.');
        console.log('- Client IP: ', ip);
        console.log('- Socket ID: ', socket.id);
        console.log('- REQUEST: ', request);

        socket.on('reply', (data) => {
            console.log(data);
        });

        socket.on('error', (err) => {
            console.log(err);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected. : ', ip);
            clearInterval(socket.interval);
        });

        socket.interval = setInterval(() => {
            socket.emit('news', 'Message from the server.');
        }, 3000);
    });
}