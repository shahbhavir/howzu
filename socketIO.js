var socketsCount = 0,
    users = {};
module.exports = function(app, io) {

  io.on('connection', function(socket){

    socket.on('user_connected', function(name){
      var msg = '';
      users[socket.id] = name;
      msg = name + ' joined the conversation.';
      console.log(msg);
      console.log('Connections: ', ++socketsCount);
      socket.broadcast.emit('user_connected', name, msg);
    });

    socket.on('chat message', function(msg){
      var name = '';
      name = users[socket.id];
      msg = name + ': ' + msg;
      console.log(msg);
      io.emit('chat message', name, msg);
    });

    socket.on('disconnect', function(){
      var msg = '', name = '';
      name = users[socket.id];
      if (!name) return;
      users[socket.id] = undefined;
      msg = name + ' left the conversation.';
      console.log(msg);
      console.log('Connections: ', --socketsCount);
      io.emit('disconnect', name, msg);
    });

  });

};