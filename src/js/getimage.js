function sendGet(name){
	var req = new XMLHttpRequest();
	req.open("GET","http://127.0.0.1:9000/getimage?name=古河渚",true);
	req.setRequestHeader("Content-Type","text/plain");
	req.send();
	req.onreadystatechange = function(){
		if (req.readyState == 4 && req.status == 200){
			document.getElementById("test").src = req.responseText;
		}
	}
}
