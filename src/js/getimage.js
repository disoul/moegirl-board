function sendGet(name){
	var req = new XMLHttpRequest();
	req.open("GET","http://127.0.0.1:9000/getimage?name="+name,true);
	req.setRequestHeader("Content-Type","text/plain");
	req.send();
	req.onreadystatechange = function(){
		if (req.readyState == 4 && req.status == 200){
			reqJson = JSON.parse(req.responseText);
			$("#"+name+" img").attr("src",reqJson.image);
			$("#"+name+" .about").append('<p>'+reqJson.text+'</p>');
			$("#"+name+" .name").append('<p>'+name+'</p>');
			$('.main-content').BlocksIt({
				numOfCol: 5,
				offsetX: 8,
				offsetY: 3,
				blockElement: '.girl-block'
			});
			$("#"+name+" .text").css("bottom","-"+$("#"+name+" .about").css("height"));
			$("#"+name).hover(
				function(){
					$("#"+name+" .text").css("bottom","0");
				},
				function(){
					$("#"+name+" .text").css("bottom","-"+$("#"+name+" .about").css("height"));
			});
		}
	}
}

function getImage(){
	$.getJSON('./js/data.json',function(data){
		for (var i = 0;i < data.amount;i++){
			(function creatImageBlock(name){
				var div = $('<div></div>');
				div.attr("id",name);
				div.addClass("girl-block");
				var img = '<img src="../image/loading.gif">';
				var textDiv = '<div class="text"><div class="name"></div><div class="about"></div></div>'

				$(".main-content").append(div);
				$("#"+name).append(img);
				$("#"+name).append(textDiv);
				$('.main-content').BlocksIt({
					numOfCol: 5,
					offsetX: 8,
					offsetY: 3,
					blockElement: '.girl-block'
				});
				sendGet(name);
			})(data.girls[i].name);			
		}
	});
}
