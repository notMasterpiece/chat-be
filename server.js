const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const uuid = require('uuid/v4');


const app = express();
const server = http.createServer(app);
const io = socketIO(server);



io.on('connection', (socket, req ) => {

    socket.join('level1');

    socket.on('message', msg => {

        const message = {
            id: uuid(),
            message: msg
        };

        socket.to('level1').emit('serverAddMsg', message);

    });

    socket.on('joinRoom', (roomId, callback) => {
        console.log(roomId);
        socket.join(roomId);
        callback(12);
    });

});



app.get('/', function (req, res) {
    res.send('Hello World!');
});

server.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
