var obj;
function processFile() {
	//var type = document.getElementById("type").value;
	//if (type == "CSV" || type == "JSON" || type == "XML") {
		var file = document.getElementById("up");
    	if(file.files.length)
    	{
    	    var reader = new FileReader();
   	     	reader.onload = function(e)
        	{
              obj = jQuery.parseJSON(e.target.result);
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
	//}
}
              //console.log(obj.Result[0].title);
function search () {
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
  for (var i=0 ; i < obj.Result.length ; i++)
  {
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
