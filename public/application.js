var socket = io();

socket.on('connected', function(message) {
  $('#server-message').html(message.res)
})

socket.on('liveStream', function(message) {
  console.log(message)
  $('#message-container').append(`
    <section class='user-message'>
      <span class='user-name'>${message.name}: </span>
      <p class='user-message'>${message.message}</p>
    </section>
  `)
})

$('form').on('submit', function(e) {
  socket.emit('liveStream', {
    name: e.currentTarget[0].value,
    message: e.currentTarget[1].value
  })

  e.currentTarget[0].value = ''
  e.currentTarget[1].value = ''

  return false
});
