var io = require('socket.io').listen(5555);

// set log level to 2 (info) from default of 3 (debug)
io.set('log level', 2);

io.sockets.on('connection', function (socket) {

  socket.on('message', function (data) {
    console.log(data);
    socket.broadcast.emit('message', data);
  });

  socket.on('disconnect', function () {
  });
});