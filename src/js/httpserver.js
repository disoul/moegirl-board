var http = require('http');
var fs = require('fs');
var path = '../html/index.html';

var server = http.createServer(function(req,res){
	fs.readFile(path,function(err,data){
		if (err) 
			throw err;
		res.end(data);
	});
});

server.listen(9000);
