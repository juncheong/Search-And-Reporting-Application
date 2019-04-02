function processFile() {
	var type = document.getElementById("type").value;
	if (type == "CSV" || type == "JSON" || type == "XML") {
		var file = document.getElementById("up");
    	if(file.files.length)
    	{
    	    var reader = new FileReader();
   	     	reader.onload = function(e)
        	{
              var obj = jQuery.parseJSON(e.target.result);
              $("#btn").after(`<br><label for = "search_Field">Search:</label>
                              <input type="text" id="search_Field" />
                              <input type="submit" id="btn2" onclick = "search()" />`);
        	};
        	reader.readAsBinaryString(file.files[0]);
    	}
	}
}
              //console.log(obj.Result[0].title);
function search () {

}
/*
function processFile () {
  var file = document.getElementById("up");
  console.log(file);
  var fr = new FileReader();
  fr.onload = function(e) { 
  	console.log(e);
    var result = JSON.parse(e.target.result);
    var formatted = JSON.stringify(result, null, 2);
	alert(result);
  }
}
*/
