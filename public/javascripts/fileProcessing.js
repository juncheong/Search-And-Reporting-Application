function processFile() {
	var type = document.getElementById("type").value;
	if (type == "CSV" || type == "JSON" || type == "XML") {
		var file = document.getElementById("up");
    	if(file.files.length)
    	{
    	    var reader = new FileReader();
   	     	reader.onload = function(e)
        	{
            	var mydata = JSON.parse(e.target.result);
				alert(mydata[0].title);
				alert(mydata[0].url);
				alert(mydata[0].description);
        	};
        	reader.readAsBinaryString(file.files[0]);
    	}
	}
}

