$(document).ready(function() {
//////////////////////
///Sockets
/////////////////////
    //Connections are grouped
    var socket = io();
    //EL For "client text"
    socket.on('client text', function(text){
        console.log(text);
    });
    //EL For"set id"
    socket.on('set id', function(id){
        $("#user-id").text(id);
    });
    //EL For"clients connected"
    socket.on('clients connected', function(amount){
        $("#clients-connected").text(amount);
    });
    //EL For"client action"
    socket.on('client action', function(id, action){
        $("#acting-user").text(id + " has pressed:");
        $("#key-pressed").text(action);
    });
//////////////////////
///Commands
/////////////////////
    //KEY SHORTCUTS
    document.addEventListener('keypress', function(event){
      var key = event.which || event.keyCode;
    //NODE KEY LOGGER
      socket.emit('client action', key);
    //ENTER KEY SHORT CUT
    if( key == 13){
        send();
        document.getElementById("text-box").value = "";
      }
    });
//////////////////////
///Functions
/////////////////////
//Sends console log message for server & client
function send(){
    var text = document.getElementById("text-box").value;
    socket.emit('client text', text);
};
///////////////////////////////////
//////////////////////////////////
});
