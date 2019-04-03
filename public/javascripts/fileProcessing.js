var obj;
var fileType;
function processFile() {
 var _validFileExtensions = [".json", ".xml", ".csv"];    
 var file = document.getElementById("up");
 var fileName = file.value;
 if (fileName.length > 0) {
  var blnValid = false;
  for (var j = 0; j < _validFileExtensions.length; j++) {
    var sCurExtension = _validFileExtensions[j];
    var extension = fileName.substr(fileName.length - sCurExtension.length, sCurExtension.length).toLowerCase();
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
  else if (fileType == ".xml") 
    obj = e.target.result;
  $("#btn").after(`<br><br>
    <div class="input-group mb-3 col-3">
    <input id = "search_Field" type="text" class="form-control" placeholder="Enter query here" aria-label="searchbar1" aria-describedby="basic-addon2" >
    <div class="input-group-append">
    <button class="btn btn-outline-secondary" type="button" onclick="search()">Search</button>
    </div>
    </div>
    `);
};
reader.readAsBinaryString(file.files[0]);
}
}
//console.log(obj.Result[0].title);
function search () {
  if (fileType == ".json")
    jsonSearch();
  else if (fileType == ".xml") {
    xmlSearch ();
  }
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
  $xml.children('results').children('result').each(function(index) {
    var title = $( this ).find('title').text();
    if (title.toUpperCase().indexOf(query) !== -1) {
      console.log(title)
      numResults++;
      $("tbody").append(`
                      <tr>
                      <td>`+ title + `</td>
                      <td><a href="`+ $( this ).find('url').text() + `"">` + $( this ).find('url').text() + `</a></td>
                      <td>` + $( this ).find('description').text() + `</td>
                      </tr>
      `);
    }
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

        