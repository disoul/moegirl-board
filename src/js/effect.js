$(document).ready(function(){
	if ( $('.girl-block')[0] != undefined ){
		$('.girl-block').each(function(){
			$(this).hover(
				function(){
					$(this).find('.text').css("bottom","0");
				},
				function(){	
					$(this).find('.text').css("bottom","-"+$(this).find(".about").css("height"));
				});
		});
	}
});
