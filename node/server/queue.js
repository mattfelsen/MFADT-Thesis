var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server).set('log level', 1);

server.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

var viewers = [];
var controllers = [];

var queue = [];

io.sockets.on('connection', function (socket) {

  //
  // INIT
  //
  socket.on('init', function (data) {
    console.log('[INIT]', data);
    socket.set('type', data.type);

    var data = {
        clients: controllers.length,
        queue: queue
      };

    if (data.type == 'controller') {
      controllers.push(socket);
      console.log('[CONN]', 'Controller connected, new count is', controllers.length);
    }

    if (data.type == 'viewer') {
      viewers.push(socket);
      console.log('[CONN]', 'Viewer connected, new count is', viewers.length);
    }

    socket.emit('init', data);

  });


  //
  // QUEUE
  //
  socket.on('queue', function (data) {
    console.log('[QEUE]', data);

    var item = {
      id: socket.id,
      image: data.image,
      remaining: 15
    }

    queue.push(item);
    io.sockets.emit('queue', queue);
    console.log('[QEUE]', 'Queue length is now', queue.length);
  });


  //
  // DISCONNECT
  //
  socket.on('disconnect', function() {

    socket.get('type', function(err, type) {
      if (err) console.log('[EROR]', err);

      if (type == 'controller') {
        controllers.splice(controllers.indexOf(socket), 1);
        console.log('[DSCN]', 'Controller disconnected, new count is', controllers.length);
      }

      if (type == 'viewer') {
        viewers.splice(viewers.indexOf(socket), 1);
        console.log('[DSCN]', 'Viewer disconnected, new count is', viewers.length);
      }
    });

  });

});