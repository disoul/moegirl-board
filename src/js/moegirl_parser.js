var gethtml = require('./gethtml.js');
var htmlparser = require('htmlparser');
var sys = require('sys');
var select = require('soupselect').select;
module.exports.getdom = function(name,callback){
	console.log(name);
	gethtml('http://zh.moegirl.org/'+encodeURI(name),function(html_str){
		console.log('DONE!');
		var handler = new htmlparser.DefaultHandler(function (err, dom){
			if (err)
				throw err;
			else {
				var img_node = select(dom, '.image');
				var text_node = select(dom, '.mw-content-ltr > p');
				
				//get Text
				var text = '';
				function gettext(node){
					try{
						var children = node.children;
					}
					catch(err){
						console.log(err);
						text = text + node.data;
						return;
					}
					if (children == undefined ){
						text = text + node.data;
						return;
					}
					children.forEach(function(element){
						gettext(element);
					});
				}
				gettext(text_node[0]);
				console.log(text);

				//get ImgUrl
				var patt = /(http:[^" ']+)/gi;                                 
				var img_url = patt.exec(img_node[0].children[0].data)[1]; 
				console.log(img_url);

				callback(img_url,text);
			}
		});
		var parser = new htmlparser.Parser(handler);
		parser.parseComplete(html_str);
	});
};
