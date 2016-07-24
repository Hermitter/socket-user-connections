var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

////////////////////
//EXPRESS
////////////////////
  //Define Public Dir
  app.use(express.static('public'));
  //Server Set Up
  http.listen(/*PORT*/, /*IP*/, function(){
    console.log('Server initiated');
  });
////////////////////
//SOCKET
////////////////////
var clients = [];
  io.on('connection', function(socket){
  //EL For Connecting
    clients.push(socket.id);
    console.log(socket.id + ' has connected');
    console.log("Current Users: " + clients);
    io.emit('clients connected', clients.length);//show current users
    io.to(socket.id).emit('set id', socket.id);//show users their is
  //EL For Disconnection
    socket.on('disconnect', function(){
      console.log(socket.id + ' has disconnected');
      for(var i = 0; i < clients.length; i++){
        if(clients[i] == socket.id){
          clients.splice(i,1);
        }
      }
      console.log("Current Users: " + clients);
      io.emit('clients connected', clients.length);
    });
  //EL For Key Logging
    socket.on('client action', function(action){
            console.log(socket.id + " has pressed " + action);
            io.emit('client action', socket.id, action);//send to clients
      });
  //gets message on button click
    socket.on('client text', function(text){
      console.log(text);
      io.emit('client text', text);
    });
  
});
