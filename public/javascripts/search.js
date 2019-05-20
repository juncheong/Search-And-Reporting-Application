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
var text = 'hello';
var query;
function search () {
	const Http = new XMLHttpRequest();
	var searchBar = document.getElementById('searchBar');
	var checkBox1 = document.getElementById('Insensitive');
	var checkBox2 = document.getElementById('Partial');
	const word= searchBar.value;
	query = word;
	var insensitive = 'false', partial = 'false';
	if (checkBox1.checked == true)
		insensitive = 'true';
	if (checkBox2.checked == true)
		partial = 'true';
	console.log("reached");
	Http.open("GET", "/api/pageWord/"+word+"/"+partial+"/"+insensitive);	
	Http.onreadystatechange = function () {
  		if(Http.readyState === 4 && Http.status === 200) {
  		  console.log(Http.responseText);
		  text = Http.responseText;
		  displayResults();
		}
	};
	Http.send();
}
function displayResults () {
	alert(text);
	var obj = JSON.parse(text);
	$("table").append(`<thead class="thead-light">
            	  <tr>
                  <th scope="col"></th>
                  <th scope="col">Page ID</th>
                  <th scope="col">URL</th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Last Modified</th>
                  <th scope="col">Last Indexed</th>
                  <th scope="col">Time to Index</th>
                  <th scope="col">Word ID</th>
                  <th scope="col">Word Name</th>
                 
                  <th scope="col">Page Word ID</th>
                  <th scope="col">Frequency</th>
                  </tr>
                  </thead>
                  <tbody>
  			</tbody>`);
	var numResults = 0;
	for (var i=0 ; i < obj.result.length ; i++) {
		numResults++;	
		$("tbody").append(`
                      <tr>
                      <td><input type="checkbox" name="name1` + i + `"/></td>
                      <td>`+ obj.result[i].pageId + `</td>
                      <td><a href="`+ obj.result[i].url + `"">` + obj.result[i].url + `</a></td>
                      <td>`+ obj.result[i].title + `</td>
                      <td>` + obj.result[i].description + `</td>
                      <td>`+ obj.result[i].lastModified + `</td>
                      <td>`+ obj.result[i].lastIndexed + `</td>
                      <td>`+ obj.result[i].timeToIndex + `</td>
                      <td>`+ obj.result[i].wordId + `</td>
                      <td>`+ obj.result[i].wordName + `</td>
                      <td>`+ obj.result[i].pageWordId + `</td>
                      <td>`+ obj.result[i].freq + `</td>
                      </tr>
      `);

	}
	if (numResults == 0) {
    $("tbody").append(`
                    <tr>
                    <td>No Results found for query: ` + query.toLowerCase() + `</td>
                    </tr>
    `);
  	}
  	else {
   		$("tbody").append(`
                    <tr>
                    <td>` + numResults + ` matches for "` + query.toLowerCase() + `"</td>
                    </tr>
    	`);
  	}
}
