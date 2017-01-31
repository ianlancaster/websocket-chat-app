const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const path = require('path');

app.use(express.static('public'));

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

let userCount = 0

io.on('connection', function (socket) {
  ++userCount
  io.sockets.emit('connected', userCount)

  socket.on('liveStream', function(message) {
    io.sockets.emit('liveStream', message)
  })

  socket.on('disconnect', function () {
    --userCount
    socket.broadcast.emit('connected', userCount)
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('Your server is up and running on Port 3000. Good job!');
});
