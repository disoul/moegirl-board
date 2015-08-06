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
			moegirl_parser.getdom(name,function (img_node){
				var patt = /(http:[^" ']+)/gi;
				var img_url = patt.exec(img_node.children[0].data)[1];
				console.log(img_url);
				response.end(img_url);
			});
		}
	}else{
		var path = '../';
		if (url.parse(request.url,true).pathname == '/') {
			path = '../html/index.html';
		}else {
			path = path + url.parse(request.url,true).pathname;
		}
		fs.readFile(path,function(err,data){
			if (err)
				throw err;
			response.end(data);
		});
	}
});

server.listen(9000);
