$(document).ready(function(){
	$(".start").click(function(){
		$(".dialog-bg").fadeIn();
	});

	$(".add").click(function(){
		var inputNode = '名称 <input name="name" type="text"/>';
		$(".data").append(inputNode);	
	});
});
