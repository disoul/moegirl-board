var gethtml = require('./gethtml.js');
var htmlparser = require('htmlparser');
var sys = require('sys');
var select = require('soupselect').select;
module.exports.getdom = function(name,callback){
	console.log(name);
	var trytimes = 0;
	function htmlcallback(html_str){
		console.log('DONE!');
		if (html_str == '' || html_str == '404'){
			console.log(html_str);
			return callback('/image/notfound.jpg','404查询失败(:3..');
		}
		console.log('233');
		var handler = new htmlparser.DefaultHandler(function (err, dom){
			if (err)
				throw err;
			else {
				var isfound = select(dom, '#disambigbox')	
				console.log(isfound[0]);
				if (isfound[0] != undefined){
					callback('/image/notfound.jpg','查询词歧义，查询失败');
					return;
				}
				var img_node = select(dom, '.image');
				var text_node = select(dom, '.mw-content-ltr > p');
			}
			while (text_node[0] == undefined || img_node[0] == undefined){
				console.log('try');
				trytimes++;
				if (trytimes > 8){
					callback('/image/notfound.jpg','查询失败，未知错误')
				}
				gethtml('https://zh.moegirl.org/'+encodeURI(name),htmlcallback);
				return;
			}

			//get Text
			var text = '';
			function gettext(node){
				try{
					var children = node.children;
				}
					catch(err){
						console.log(err);
						try{
							text = text + node.data;
						}
						catch(err){
							console.error(err);
						}
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
			var patt = /src="(http[s]*:[^" ']+)/gi;                                 
			try{
				var img_url = patt.exec(img_node[0].children[0].data)[1]; 
			}
			catch(err){
				console.log(img_node[0].children);
				console.error(err);
				img_url = patt.exec(img_node[0].children[1].data)[1];
			}
			console.log(img_url);

			callback(img_url,text);
		});
		var parser = new htmlparser.Parser(handler);
		parser.parseComplete(html_str);
	};
	gethtml('https://zh.moegirl.org/'+encodeURI(name),htmlcallback);

};
