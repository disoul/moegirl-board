var https = require('https');
module.exports = function(html,callback){
	var response = [];
	https.get(html,function(res){
		if (res.statusCode == 404){
			callback('404');
			return;
		}
		res.setEncoding('utf8');
		res.on('data',function(data){
			response.push(data);
		});
		res.on('end',function(){
			callback(response);
		});
	});
};
