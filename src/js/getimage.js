var column = 5;

function sendGet(name){
	var req = new XMLHttpRequest();
	req.open("GET","http://127.0.0.1:9000/getimage?name="+name,true);
	req.setRequestHeader("Content-Type","text/plain");
	req.send();
	req.onreadystatechange = function(){
		if (req.readyState == 4 && req.status == 200){
			
			var reqJson = JSON.parse(req.responseText),
			    $img = $("#"+name+" img"),
				$about = $("#"+name+" .about"),
				$name = $("#"+name+" .name"),
				$text = $("#"+name+" .text"),
				$block = $("#"+name);

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

				$text.css("bottom","-"+$("#"+name+" .about").css("height"));
				$block.css("width",$block.css("width"));
				$block.css("height",$block.css("height"));
				$("#"+name).hover(
					function(){
						$text.css("bottom","0");
					},
					function(){
						$text.css("bottom","-"+$("#"+name+" .about").css("height"));
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
				$("#"+name).append(textDiv);
				$("#"+name).append(img);
				$('.main-content').BlocksIt({
					numOfCol: column,
					offsetX: 8,
					offsetY: 3,
					blockElement: '.girl-block'
				});
				sendGet(name);
			})(data.girls[i].name);			
		}
	}
	addDom(data);
}

