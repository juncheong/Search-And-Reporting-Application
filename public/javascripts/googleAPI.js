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
    Http.send(null);
    Http.onreadystatechange=(e)=>{
      if (Http.readyState == 4 && Http.status == 200)
     console.log(Http.responseText)
} 
  }