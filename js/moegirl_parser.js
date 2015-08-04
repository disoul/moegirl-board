var gethtml = require('./gethtml.js');
var htmlparser = require('htmlparser');
var sys = require('sys');
var select = require('soupselect').select;
module.exports.getdom = function(name,callback){
	console.log(name);
	gethtml('http://zh.moegirl.org/'+name,function(html_str){
		console.log('DONE!');
		var handler = new htmlparser.DefaultHandler(function (err, dom){
			if (err)
				throw err;
			else {
				var img_node = select(dom, '.image');
				callback(img_node[0]);
			}
		});
		var parser = new htmlparser.Parser(handler);
		parser.parseComplete(html_str);
	});
};
