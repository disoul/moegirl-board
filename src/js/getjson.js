function commit(){
	var json = {
			'width':0,
			'column':0,
			'girls':[]
	};
	json.width = $('.width').val();
	json.column = $('.column').val();

	$('.name').each(function(index,element){
		if ($(this).val() != ''){
			json.girls.push({'name':$(this).val()});
		}
	});

	$.cookie('girls',JSON.stringify(json));
	window.open("http://127.0.0.1:9000/html/index.html");
}
