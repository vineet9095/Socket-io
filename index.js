const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const path = require('path');
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


let users = 0;
io.on('connection', (socket) => {
  console.log('A user connected');
  users++;
  // io.sockets.emit('broadcast', { message: users + ' Users connected!' });
  socket.emit('newuserconnect', { massage: ' Hii, Welcome Dear!' }); //this is use for send massagefor new joinee

  socket.broadcast.emit('newuserconnect', { massage: users + ' Users connected!' }); // This is use for send massage for privious userswho are join this network


  // setTimeout(function () {

  // this is called event creation
  //   // socket.send('Sent message from server side by prereserved events');
  //   socket.emit('myCustomEvent', { description: 'A custom massage from server side!' }); 
  // }, 3000);

  // Listen for a custom event 'chat message'
  // socket.on('myCustomEventFromClientSide', function (data) {
  //   console.log("Data ", data);
  // });


  // Broadcast the message to all connected clients
  // io.emit('chat message', message);
  // });

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('A user disconnected');
    users--;
    // io.sockets.emit('broadcast', { message: users + ' Users connected!' });
    socket.broadcast.emit('newuserconnect', { massage: users + ' Users connected!' });

  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
