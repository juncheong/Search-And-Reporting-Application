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
function search () {
	const Http = new XMLHttpRequest();
	var searchBar = document.getElementById('searchBar');
	var checkBox1 = document.getElementById('Insensitive');
	var checkBox2 = document.getElementById('Partial');
	const word= searchBar.value;
	var insensitive = 'false', partial = 'false';
	if (checkBox1.checked == true)
		insensitive = 'true';
	if (checkBox2.checked == true)
		partial = 'true';
	console.log(word);
	Http.open("GET", "/api/pageWord/"+word+"/"+partial+"/"+insensitive);	
	//Http.setRequestHeader("Content-Type", "application/json");
	Http.send();
	Http.onreadystatechange=(e)=>{
	console.log(Http.responseText)
	//var jsonString = Http.responseText;
	}
}