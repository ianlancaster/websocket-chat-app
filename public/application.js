var socket = io();

socket.on('liveStream', function(message) {
  $('main').append(message.res)

  socket.send('liveStream', {
    username: 'yournamehere',
    text: 'I did the thing.'
  });
})
