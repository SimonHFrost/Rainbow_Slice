var http = require('http');
var static = require('node-static');
var socketIO = require('socket.io');

var config = require('./config');

var port = config.DEBUG_MODE ? 8080 : 32491;
var publicFolder = config.DEBUG_MODE ? './public' : '../public';
console.log('Debug mode = ' + config.DEBUG_MODE);

var folder = new(static.Server)(publicFolder);
httpServer = http.createServer(function (request, response) {
  folder.serve(request, response);
}).listen(port);

io = socketIO.listen(httpServer);

var connectionCount = 0;
io.sockets.on('connection', function () {
  console.log('Client Connected!');
  connectionCount++;

  io.sockets.emit('connectionCount', { connectionCount: connectionCount });
});
