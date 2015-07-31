var http = require('http');
var gethtml = function(html,callback){
	var response = [];
	http.get(html,function(res){
		res.setEncoding('utf8');
		res.on('data',function(data){
			response.push(data);
		});
		res.on('end',function(){
			callback(response);
		});
	});
};

module.exports = gethtml;
