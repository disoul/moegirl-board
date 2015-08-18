function commit(){
	var json = {
			'width':0,
			'column':0,
			'girls':[]
	};

	json.width = Number($('.width').val());
	if (json.width == NaN || json.width == 0)
		json.width = 1080;

	json.column = Number($('.column').val());
	if (json.column == NaN || json.column == 0)
		json.column = 5;

	$('.name').each(function(index,element){
		if ($(this).val() != ''){
			json.girls.push({'name':$(this).val()});
		}
	});

	$.cookie('girls',JSON.stringify(json));
	window.open("http://moe.disoul.me/html/index.html");
}
