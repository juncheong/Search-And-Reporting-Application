 var cx;
 var create = document.getElementById('create');
  create.style.display = 'none';
  (function() {
    cx = '006407600163843634466:rqjka30dxy0';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();

var query;

  function custom() {
    create = document.getElementById('create');
    create.style.display = 'none'
    down = document.getElementById('downloadlink');
    down.style.display = 'none'
    const Http = new XMLHttpRequest();
    var searchBar = document.getElementById('searchBar').value;
    query = searchBar;
     const paramUrl = 'https://www.googleapis.com/customsearch/v1?q=' + searchBar + '&cx=' + cx + '&key=AIzaSyBQgAEFzXn12Ke34TZuTcvhF24PW1P6XxY'; 
    console.log(paramUrl)
    Http.open("GET", paramUrl);
    Http.onreadystatechange = function () {
      if (Http.readyState === 4 && Http.status == 200){
     console.log(Http.responseText)
     text = Http.responseText;
     showResults();
      }      
    };
    Http.send();
  }


  function showResults () {
    $("table").empty();
	var obj = JSON.parse(text);
	$("table").append(`<thead class="thead-light">
                <tr>
                <th scope="col">Title</th>
                  <th scope="col">URL</th>
                  <th scope="col">Description</th>
                  </tr>
                  </thead>
                  <tbody>
  			</tbody>`);
	var numResults = 0;
	for (var i=0 ; i < obj.items.length ; i++) {
		numResults++;	
		$("tbody").append(`
                      <tr>
                      <td><input type="checkbox" name="name1` + i + `"/></td>

                      <td>`+ obj.items[i].title + `</td>
                      <td><a href="`+ obj.items[i].link + `"">`+ obj.items[i].link + `</a></td>
                      <td>` + obj.items[i].snippet + `</td>
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
    $( "#save" ).remove();
  $( "#saveSubmit" ).remove();

  $( "#dropdown" ).empty();
  $( "table" ).after(`
    <input type="button" id = "save" value="Save Results" onclick="dropdown()">
    `);
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
  var vals = ["title","url","description"];
  var string = '';
  if (type == "json")
    string = '\n{';
  else if (type == 'xml')
    string = '<result>\n';
  for (var j = 1, col; col = row.cells[j]; j++) {
    if (type == "csv") {
      string += '"' + (j==2 ? col.childNodes[0].href : col.innerHTML) + '"';
      if (j < 3)
        string += ',';
      else string += '\n';
    }
    else if (type == "json") {
      string += '"'+ vals[j-1] +'":"' + (j==2 ? col.childNodes[0].href : col.innerHTML) + '"';
      if (j < 3)
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


