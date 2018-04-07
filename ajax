 1. Amongst the most important reasons are JavaScript's non-blocking properties, or that it is an asynchronous language.
 2. Most websites have to make multiple requests to work fully. The way JavaScript handles multiple requests is called its event loop. 
 3. In the case of requesting information from another site, we separate the request (asking another website for information) from what we want to do with the response (the information the website returns to us). We can do this using a system of technologies called Asynchronous JavaScript and XML, or AJAX.
 4. AJAX involves requesting data over the web, which is done using HTTP Requests. There are four commonly used types of HTTP requests - GET, POST, PUT, and DELETE.
 5. GET requests receive information from other sites by sending a query. POST requests can change information on another site and will receive information or data in response.
 6. 
 ```javascript
 // GET
const xhr = new XMLHttpRequest();
const url = 'http://api-to-call.com/endpoint';
xhr.responseType = 'json';
xhr.onreadystatechange = function() {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    console.log(xhr.response);
  }
};
xhr.open('GET', url);
xhr.send();
// we call the .send() method on our xhr object and pass it no arguments. This is because data sent in GET requests is sent as part of the URL.


// POST
const xhr = new XMLHttpRequest();
const url = 'http://api-to-call.com/endpoint';
const data = JSON.stringify({
  id: '200'
});
xhr.responseType = 'json';
xhr.onreadystatechange = function() {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    console.log(xhr.response);
  }
};
xhr.open('POST', url);
xhr.send(data);
```
7. it required the use of an XMLHttpRequest object, a JavaScript object that is used to retrieve data. 
`onreadystatechange` is an event handler that is called whenever the value of the readyState property changes. 
`.open()` creates and structures the request. It tells the request what method to use, GET or POST, and what URL to query.
Calling the `.send()` method sends the xhr object with its relevant information to the API URL.

8.
```javascript
const apiKey = 'AIzaSyAv4hU-zRjuCQg3j6TbDLLGuGTMa6Fza3o';
const url="https://www.googleapis.com/urlshortener/v1/url";

// Some page elements
const $inputField = $('#input');
const $responseField = $('#responseField');

// AJAX functions
function expandUrl() {
	const urlToExpand=url+'?key='+apiKey+'&shortUrl='+$inputField.val();
  const xhr=new XMLHttpRequest();
  xhr.responseType='json';
  xhr.onreadystatechange=function(){
    if(xhr.readyState===XMLHttpRequest.DONE){
      console.log(xhr.response);
      $responseField.append('<p>Your expanded url is: </p><p>' + xhr.response.longUrl + '</p>');
     }
  };
  xhr.open('GET',urlToExpand);
  xhr.send();
}
```

9. Recall that in a GET request, the query information (what you're asking the server to return) is generally sent as part of the URL whereas in a POST request, the information is sent to the server as part of the body of the request. This information is created and saved in the data constant and sent to the API as an argument passed to the .send() method.
