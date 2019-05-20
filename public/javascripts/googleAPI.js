 (function Search() {
    var cx = '006407600163843634466:7n12fra2wyc';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
//     <table class="table col-9"> 
//     <thead class="thead-light">
//     <tr>
//       <th scope="col">Title</th>
//       <th scope="col">Website URL</th>
//       <th scope="col">Description</th>
//     </tr>
//   </thead>
// <tbody>
// List<Result> results = result.getItems();
// for (Result r : results) {
//  <tr>
//   <td>r.getName()</td>
//   <td>r.getLink()</td>
//   <td></td>
// </tr>
// }

//         </tbody>
//   </table>
    console.log(document);
    const paramUrl = 'GET ' + 'https://www.googleapis.com/customsearch/v1?q=' + document.getElementById("searchbox_XXXXXXXXXX:YYYYYYYYY").elements[2].value + '&cx=' + cx; 
    console.log(paramUrl)
    const Http = new XMLHttpRequest();
    Http.open("GET", paramUrl);
    Http.send(null);
    Http.onreadystatechange=(e)=>{
      if (Http.readyState == 4 && Http.status == 200)
      aCallback(anHttpRequest.responseText);
    console.log(Http.responseText)
} 
  })();


