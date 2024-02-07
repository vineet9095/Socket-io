const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const path = require('path');
const port = 3000;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "nameSpaces.html"));
});


var cnsp = io.of('/custom-namespace');

cnsp.on('connection', (socket) => {
    console.log("A User connected");

    cnsp.emit('customEvent', { massage: 'Tester Event call!' });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
