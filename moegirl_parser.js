var gethtml = require('./gethtml.js');
var htmlparser = require('htmlparser');
var sys = require('sys');
var select = require('soupselect').select;
var getdom = function(name){
	console.log(name);
	gethtml('http://zh.moegirl.org/'+name,function(html_str){
		console.log('DONE!');
		var handler = new htmlparser.DefaultHandler(function (err, dom){
			if (err)
				throw err;
			else {
				var img_node = select(dom, '.image');
				img_node.forEach(function(element){
					console.log(element);
				});
			}
		});
		var parser = new htmlparser.Parser(handler);
		parser.parseComplete(html_str);
	});
};

getdom(process.argv[2]);
