var obj;
var fileType;
var extension;
var create = document.getElementById('create');
  create.style.display = 'none';
function processFile() {
 var _validFileExtensions = [".json", ".xml", ".csv"];    
 var file = document.getElementById("up");
 var fileName = file.value;
 if (fileName.length > 0) {
  var blnValid = false;
  for (var j = 0; j < _validFileExtensions.length; j++) {
    var sCurExtension = _validFileExtensions[j];
    extension = fileName.substr(fileName.length - sCurExtension.length, sCurExtension.length).toLowerCase();
    if (extension == sCurExtension.toLowerCase()) {
      blnValid = true;
      console.log(extension);
      fileType = extension;
      break;
    }
  }

  if (!blnValid) {
    alert("Sorry, " + fileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
    return false;
  }
}
if(file.files.length)
{
 var reader = new FileReader();
 reader.onload = function(e)
 {
  if (fileType == ".json")
    obj = jQuery.parseJSON(e.target.result);
  else
    obj = e.target.result;
  $( "#bar" ).empty();
  $("#bar").append(`
    <input id = "search_Field" type="text" class="form-control" placeholder="Enter query here" aria-label="searchbar1" aria-describedby="basic-addon2" >
    <div class="input-group-append">
    <button class="btn btn-outline-secondary" type="button" onclick="search()">Search</button>
    </div>
    `);
};
reader.readAsBinaryString(file.files[0]);
}
}
//console.log(obj.Result[0].title);
function search () {
  create = document.getElementById('create');
    create.style.display = 'none'
    down = document.getElementById('downloadlink');
    down.style.display = 'none'
  if (fileType == ".json")
    jsonSearch();
  else if (fileType == ".xml") {
    xmlSearch ();
  }
  else {
    csvSearch();
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
function jsonSearch () {
  var query = document.getElementById("search_Field").value;
  console.log(query);
  query = query.toUpperCase();
  var searchResults = "";
  var numResults = 0;
  $( "table" ).empty();
  $("table").append(`<thead class="thead-light">
                  <tr>
                  <th scope="col"></th>
                  <th scope="col">Title</th>
                  <th scope="col">Website URL</th>
                  <th scope="col">Description</th>
                  </tr>
                  </thead>
                  <tbody>
  </tbody>`);
  for (var i=0 ; i < obj.Result.length ; i++) {
    if (obj.Result[i].title.toUpperCase().indexOf(query) !== -1) {
      numResults++;
      $("tbody").append(`
                      <tr>
                      <td><input type="checkbox" name="name1` + i + `"/></td>
                      <td>`+ obj.Result[i].title + `</td>
                      <td><a href="`+ obj.Result[i].url + `"">` + obj.Result[i].url + `</a></td>
                      <td>` + obj.Result[i].description + `</td>
                      </tr>
      `);
    }
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

function xmlSearch () {
  $( "table" ).empty();
  $("table").append(`<thead class="thead-light">
                  <tr>
                  <th scope="col"></th>                  
                  <th scope="col">Title</th>
                  <th scope="col">Website URL</th>
                  <th scope="col">Description</th>
                  </tr>
                  </thead>
                  <tbody>
  </tbody>`);
  var query = document.getElementById("search_Field").value;
  console.log(query);
  query = query.toUpperCase();
  var numResults = 0;
  var text, parser, xmlDoc;
  text = obj;
  xmlDoc = $.parseXML(text),
  $xml = $( xmlDoc ),
  $firstCookBook = $xml.find('result').find('title').first().text();
  //console.log($firstCookBook);
  var i = 0;
  $xml.children('results').children('result').each(function(index) {
    var title = $( this ).find('title').text();
    if (title.toUpperCase().indexOf(query) !== -1) {
      console.log(title)
      numResults++;
      $("tbody").append(`
                      <tr>
                      <td><input type="checkbox" name="name` + i + `" /></td>
                      <td>`+ title + `</td>
                      <td><a href="`+ $( this ).find('url').text() + `"">` + $( this ).find('url').text() + `</a></td>
                      <td>` + $( this ).find('description').text() + `</td>
                      </tr>
      `);
    }
    i++;
  })
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

function csvSearch () {
  $( "table" ).empty();
  $("table").append(`<thead class="thead-light">
                  <tr>
                  <th scope="col"></th>
                  <th scope="col">Title</th>
                  <th scope="col">Website URL</th>
                  <th scope="col">Description</th>
                  </tr>
                  </thead>
                  <tbody>
  </tbody>`);
  var query = document.getElementById("search_Field").value;
  console.log(query);
  query = query.toUpperCase();
  var numResults = 0;
  var arrays = $.csv.toArrays(obj);
  for(var i = 0; i < arrays.length; i++) {
    var array = arrays[i];
    var title = array[0];
    if (title.toUpperCase().indexOf(query) !== -1) {
      numResults++;
      $("tbody").append(`
                      <tr>
                      <td><input type="checkbox" name="name` + i + `" /></td>
                      <td>`+ title + `</td>
                      <td><a href="`+ array[1] + `"">` + array[1] + `</a></td>
                      <td>` + array[2] + `</td>
                      </tr>
      `);
    }
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

        