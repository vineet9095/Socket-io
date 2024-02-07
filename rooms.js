const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const path = require('path');
const port = 3000;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "rooms.html"));
});

var roomno = 1;
var full = 0;

io.on('connection', (socket) => {
    console.log("A User connected");

    socket.join('room-' + roomno);


    io.sockets.in("room-" + roomno).emit('connectRoom', { massage: "You are conneccted to room no. " + roomno })

    full++;
    if (full >= 2) {
        full = 0;
        roomno++;
    }

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
