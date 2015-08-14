$(document).ready(function(){
	$(".start").click(function(){
		$(".dialog-bg").fadeIn();
	});

	$(".add").click(function(){
		var inputNode = '名称 <input class="name" name="name" type="text"/>';
		$(".data").append(inputNode);	
	});

	$(".exit").click(function(){
		$(".dialog-bg").fadeOut();
	});

	$(".commit").click(function(){
		commit();
	});
});
