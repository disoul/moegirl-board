$(document).ready(function(){
	$(".preview").click(function(){
		$.getJSON('/js/data.json',function(data){
			var json = {
				'width': 1080,
				'column': 5,
				'girls': []
			};
			json.girls = data.girls;
			$.cookie('girls',JSON.stringify(json));
			window.open('http://127.0.0.1:9000/html/index.html');
		});
	});
});
