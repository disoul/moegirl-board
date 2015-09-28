var http = require('http');
var url = require('url');
var moegirl_parser = require('./moegirl_parser.js');
var fs = require('fs');
var server = http.createServer(function(request,response){
	if (url.parse(request.url,true).pathname == '/getimage'){
		if (request.method != 'GET'){
			response.end('bad request');
		}else{
			var name = url.parse(request.url,true).query['name'];
			moegirl_parser.getdom(name,function (img,text){
				var resJson = {
					'image': img,
					'text': text,
				};
				response.writeHead(200,{ 'Content-Type': 'application/json' });
				response.end(JSON.stringify(resJson));
			});
		}
	}else{
		var path = '..';
		if (url.parse(request.url,true).pathname == '/') {
			path = '../html/home.html';
			fs.readFile(path,function(err,data){
				if (err)
					throw err;
				response.end(data);
			});
		}else {
			response.end('bad request');
		}
	}
});

server.listen(8080);
