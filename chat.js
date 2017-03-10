var express = require('express'),
	chat = express(),
	server = require('http').createServer(chat),
	io = require('socket.io').listen(server),
	nicknames = [];

server.listen(3000);
console.log("chat listening on port 3000");

chat.get('/chat',function(req, res){
	res.sendfile(__dirname + '/chat.html');
});

io.sockets.on('connection',function(socket){
	socket.on('new user', function(data, callback){
		if (nicknames.indexOf(data) != -1){
			callback(false);
		}else {
			callback(true);
			socket.nickname = data;
			nicknames.push(socket.nickname);
			updateNicknames();
		}

	});

	function updateNicknames(){
		io.sockets.emit('usernames', nicknames);
	}


	socket.on('send message',function(data){
		io.sockets.emit('new message',{msg:data, nick:socket.nickname});

	});

	socket.on('disconnect',function(data){
		if(!socket.nickname) return;
		nicknames.splice(nicknames.indexOf(socket.nickname), 1);
		updateNicknames();
	});
});