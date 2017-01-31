const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const path = require('path');

app.use(express.static('public'));

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

io.on('connection', function (socket) {

  // var interval = setInterval(function () {
  //   socket.emit('liveStream', { res: 'Sample Response</br>' });
  // }, 1000);

  socket.emit('connected', { res: 'You have connected'})

  // socket.on('message', function (channel, message) {
  //   console.log('socket.on("message"): ' + channel + ':', message);
  // });

  socket.on('liveStream', function(message) {
    console.log('liveStream: ' + message)
    socket.emit('liveStream', message)
  })

  // socket.on('disconnect', function () {
  //   clearInterval(interval);
  // });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('Your server is up and running on Port 3000. Good job!');
});
