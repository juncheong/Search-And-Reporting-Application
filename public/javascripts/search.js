function postToDatabase() {
	const Http = new XMLHttpRequest();
	var e = document.getElementById('urlText');
	const url= e.value;
	console.log(url);
	var jString = '{"url":"' + url + '"}';
	Http.open("POST", "api/indexing");	
	Http.setRequestHeader("Content-Type", "application/json");
	Http.send(jString);
	Http.onreadystatechange=(e)=>{
	console.log(Http.responseText)
	}
}