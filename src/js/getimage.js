var column = 5;

function sendGet(node,name){
	var req = new XMLHttpRequest();
	req.open("GET","http://moe.disoul.me/getimage?name="+name,true);
	req.setRequestHeader("Content-Type","text/plain");
	req.send();
	req.onreadystatechange = function(){
		if (req.readyState == 4 && req.status == 200){
			
			var reqJson = JSON.parse(req.responseText),
			    $img = node.find("img"),
				$about = node.find(".about"),
				$name = node.find(".name"),
				$text = node.find(".text"),
				$block = node;

			$img.attr("src",reqJson.image);
			$about.append('<p>'+reqJson.text+'</p>');
			$name.append('<p>'+name+'</p>');
			$img.load(function(){
				$('.main-content').BlocksIt({
					numOfCol: column,
					offsetX: 8,
					offsetY: 3,
					blockElement: '.girl-block'
				});

				$text.css("bottom","-"+$about.css("height"));
				$block.css("width",$block.css("width"));
				$block.css("height",$block.css("height"));
				$block.hover(
					function(){
						$text.css("bottom","0");
					},
					function(){
						$text.css("bottom","-"+$about.css("height"));
				});
			});
		}
	}
}

function getImage(){
	$('button').hide();
	var data = JSON.parse($.cookie("girls"));
	column = data.column;
	$('.main-content').css('width',data.width);
	function addDom(data){
		for (var i = 0;i < data.girls.length;i++){
			(function creatImageBlock(name){
				var div = $('<div></div>');
				div.attr("id",name);
				div.addClass("girl-block");
				var img = '<img src="../image/loading.gif">';
				var textDiv = '<div class="text"><div class="name"></div><div class="about"></div></div>'

				$(".main-content").append(div);
				div.append(textDiv);
				div.append(img);
				$('.main-content').BlocksIt({
					numOfCol: column,
					offsetX: 8,
					offsetY: 3,
					blockElement: '.girl-block'
				});
				sendGet(div,name);
			})(data.girls[i].name);			
		}
	}
	addDom(data);
}

