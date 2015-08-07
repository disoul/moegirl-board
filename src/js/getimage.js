function sendGet(name){
	var req = new XMLHttpRequest();
	req.open("GET","http://127.0.0.1:9000/getimage?name="+name,true);
	req.setRequestHeader("Content-Type","text/plain");
	req.send();
	req.onreadystatechange = function(){
		if (req.readyState == 4 && req.status == 200){
			$("#"+name+" img").attr("src",req.responseText);
			$('.main-content').BlocksIt({
				numOfCol: 5,
				offsetX: 8,
				offsetY: 3,
				blockElement: '.girl-block'
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
				$(".main-content").append(div);
				$("#"+name).append(img);
				sendGet(name);
			})(data.girls[i].name);			
		}
	});
}
