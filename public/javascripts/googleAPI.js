 var cx;
 
  (function() {
    cx = '006407600163843634466:rqjka30dxy0';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();


  function custom() {
    const Http = new XMLHttpRequest();
    var searchBar = document.getElementById('searchBar').value;
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
	var obj = JSON.parse(text);
	$("table").append(`<thead class="thead-light">
            	  <tr>
                  <th scope="col">URL</th>
                  <th scope="col">Title</th>
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
                      <td><a href="`+ obj.items[i].link + `"">` + obj.items[i].link + `</a></td>
                      <td>`+ obj.items[i].title + `</td>
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
  }
