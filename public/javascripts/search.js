var create;
var numResults;
var getAll = false;
function postToDatabase() {
	const Http = new XMLHttpRequest();
	var e = document.getElementById('urlText');
	const url= e.value;
	console.log(url);
	var jString = '{"url":"' + url + '"}';
	Http.open("POST", "api/indexing");	
	Http.setRequestHeader("Content-Type", "application/json");
	Http.onreadystatechange = function () {
  		if(Http.readyState === 4 && Http.status === 200) {
  		  console.log(Http.responseText);
		  alert("Successfully added " + url + " to the database.");
		}
	};
	//Http.onreadystatechange=(e)=>{
	//alert("you have successfully added a url");
	//console.log(Http.responseText)
	//}
	Http.send(jString);

}
var text = 'hello';
var query;
var searchDate;
var searchTime;
function search () {
	create = document.getElementById('create');
  	create.style.display = 'none'
  	down = document.getElementById('downloadlink');
  	down.style.display = 'none'
  	var startDate = new Date();
  	var startTime = startDate.getTime();
  	var endDate, endTime;
	var date = startDate.getDate();
	var month = startDate.getMonth(); 
	var year = startDate.getFullYear();
	var formattedDate = [startDate.getFullYear(),
				startDate.getMonth()+1,
               startDate.getDate()].join('/')+' '+
              [startDate.getHours(),
               startDate.getMinutes(),
               startDate.getSeconds()].join(':');
  	searchDate  = new Date().toISOString().slice(0, 19).replace('T', ' ');;
  	console.log(searchDate);
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
		  endDate = new Date();
		  endTime = endDate.getTime();
		  searchTime = endTime - startTime;
		  console.log("Search Time" + searchTime);
		  displayResults()
		  postSearch();
		}
	};
	Http.send();
	

}
function displayResults () {
	var obj = JSON.parse(text);
	$("table").empty();
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
	numResults = 0;
	if (obj.result != undefined) {
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
                    <td>` + numResults + ` matches for "` + query.toLowerCase() + `" found in ` + searchTime + ` milliseconds.</td>
                    </tr>
    	`);
  	}
  	$( "#save" ).remove();
  $( "#saveSubmit" ).remove();

  $( "#dropdown" ).empty();
  $( "table" ).after(`
    <input type="button" id = "save" value="Save Results" onclick="dropdown()">
    `);
	}
	
}

function dropdown () {
  $( "#dropdown" ).empty();
  $( "#dropdown" ).append(`
       <fieldset>
          <legend>Choose format of resulting file:</legend>
          <p>
             <label>Select list</label>
             <select id = "fileList">
               <option value = "json">.json</option>
               <option value = "csv">.csv</option>
               <option value = "xml">.xml</option>
             </select>
          </p>
       </fieldset>
  `);
  var create = document.getElementById('create');
  create.style.display = 'block';
}
function createFile () {
  var list = document.getElementById("fileList");
  var type = list.options[list.selectedIndex].value;
  var fileContent = findCheckedRows();
  if (type == "json") {
    //var jsonse = JSON.stringify(fileContent);
    var blob = new Blob([fileContent], {type: "application/json"});
    var url  = URL.createObjectURL(blob);

    var link = document.getElementById('downloadlink');

    link.href        = url;
    link.download    = "Results.json";
    link.textContent = "Download Results.json";
    link.style.display = 'block';
  }
  else if (type == "csv") {
    var csvFile = new Blob([fileContent], {type: 'text/csv'});
    var url  = URL.createObjectURL(csvFile);

    var link = document.getElementById('downloadlink');

    link.href        = url;
    link.download    = "Results.csv";
    link.textContent = "Download Results.csv";
    link.style.display = 'block';
  }
  else if (type == "xml") {
    var blob = new Blob([fileContent], {type: "text/xml"});
    var url  = URL.createObjectURL(blob);

    var link = document.getElementById('downloadlink');

    link.href        = url;
    link.download    = "Results.xml";
    link.textContent = "Download Results.xml";
    link.style.display = 'block';
  }
}

function findCheckedRows() {
  var list = document.getElementById("fileList");
  var type = list.options[list.selectedIndex].value;
  var string = '';
  if (type == "json") 
    string += '{\n\t"Result\" : [';
  else if (type == "xml")
    string += '<results>\n';
  var table = document.getElementById("results");
  for (var i = 1, row; row = table.rows[i]; i++) {
    console.log("row");
    if (row.children[0].childNodes[0].checked == true) 
      string += parseRow(row);
  }
  string = string.substring(0, string.length-1);
  if (type == "json") 
    string += '\n]\n}';
  else if (type == "xml")
    string += '</results>\n';
  //alert(string);
  return string;
}
function parseRow(row) {
  var list = document.getElementById("fileList");
  var type = list.options[list.selectedIndex].value;
  var vals = ["pageId","url","title","description","lastModified","lastIndexed","timeToIndex","wordId", "wordName","pageWordId", "Frequency"];
  var string = '';
  if (type == "json")
    string = '\n{';
  else if (type == 'xml')
    string = '<result>\n';
  for (var j = 1, col; col = row.cells[j]; j++) {
    if (type == "csv") {
      string += '"' + (j==2 ? col.childNodes[0].href : col.innerHTML) + '"';
      if (j < 11)
        string += ',';
      else string += '\n';
    }
    else if (type == "json") {
      string += '"'+ vals[j-1] +'":"' + (j==2 ? col.childNodes[0].href : col.innerHTML) + '"';
      if (j < 11)
        string += ',';
      string += '\n';
    }
    else if (type == "xml") {
      string += '<' + vals[j-1] + '>' + (j==2 ? col.childNodes[0].href : col.innerHTML) + '</' + vals[j-1] + '>\n';
    }
  }
  if (type == "json")
    string += "},";
  else if (type == "xml")
    string += '</result>\n';
  return string;
}
function getAllSearches() {
	getAll = true;
	const Http = new XMLHttpRequest();
	Http.open("GET", "api/search");	
	//Http.setRequestHeader("Content-Type", "application/json");
	Http.onreadystatechange = function () {
		if(Http.readyState === 4 && Http.status === 200) {
		  	console.log(Http.responseText);
			text = Http.responseText;
			console.log(Http.status);
			displayHistory();
	  	}
  	};
  	Http.send();
}
function displayHistory () {
	var obj = JSON.parse(text);
	$("table").append(`<thead class="thead-light">
            	  <tr>
                  <th scope="col">Terms</th>
                  <th scope="col">Count</th>
                  <th scope="col">Search Date</th>
                  <th scope="col">Time To Search</th>
                  </tr>
                  </thead>
                  <tbody>
  			</tbody>`);
	numResults = 0;
	if (obj != undefined) {
	for (var i=0 ; i < obj.length ; i++) {
		numResults++;	
		$("tbody").append(`
                      <tr>
                      <td>`+ obj[i].terms + `</td>
                      <td>`+ obj[i].count + `</td>
                      <td>` + obj[i].searchDate + `</td>
                      <td>`+ obj[i].timeToSearch + `</td>
                      </tr>
      `);
	}
	if (numResults == 0) {
    $("tbody").append(`
                    <tr>
                    <td>No Searches Found</td>
                    </tr>
    `);
  	}
  	else {
   		$("tbody").append(`
                    <tr>
                    <td>` + numResults + ` searches found</td>
                    </tr>
    	`);
  	}
  	
	}
}

// left todo parse the json returned in search and pass it into this function
function postSearch(string) {
	var jsonString = '{"terms":"'+query+'","count":"'+numResults+'","searchDate":"'+searchDate+'","timeToSearch":"'+searchTime+'"}';
	console.log("search srting" + jsonString);
	const Http = new XMLHttpRequest();
	Http.open("POST", "api/search");	
	Http.setRequestHeader("Content-Type", "application/json");
	Http.onreadystatechange = function () {
		console.log(Http.responseText);
		 console.log(Http.status);
		if(Http.readyState === 4 && Http.status === 200) {
		  	console.log(Http.responseText);
			console.log(Http.status);
	  	}
 	};
	Http.send(jsonString);
}
