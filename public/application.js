const socket = io()
const $messagesContainer = $('#message-container')

const messageTemplate = (message) => (`
  <section class='message'>
    <span class='user-name'>${message.name}: </span>
    <p class='user-message'>${message.message}</p>
  </section>
`)

socket.on('connected', function(userCount) {
  const display = userCount === 1
    ? 'You are connected'
    : `You and ${userCount - 1} other users are connected`

  $('#server-message').html(display)
})

socket.on('messageArchive', function(messageArchive) {
  messageArchive.forEach(message => {
    $messagesContainer.append(messageTemplate(message))
  })
})

socket.on('liveStream', function(message) {
  $messagesContainer.append(messageTemplate(message))
})

$('form').on('submit', function(e) {
  socket.emit('liveStream', {
    name: e.currentTarget[0].value,
    message: e.currentTarget[1].value
  })

  e.currentTarget[0].value = ''
  e.currentTarget[1].value = ''

  return false
})
