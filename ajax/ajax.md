 1. Amongst the most important reasons are JavaScript's non-blocking properties, or that it is an asynchronous language.
 2. Most websites have to make multiple requests to work fully. The way JavaScript handles multiple requests is called its event loop. 
 3. In the case of requesting information from another site, we separate the request (asking another website for information) from what we want to do with the response (the information the website returns to us). We can do this using a system of technologies called Asynchronous JavaScript and XML, or AJAX.
 4. AJAX involves requesting data over the web, which is done using HTTP Requests. There are four commonly used types of HTTP requests - GET, POST, PUT, and DELETE.
 5. GET requests receive information from other sites by sending a query. POST requests can change information on another site and will receive information or data in response.
 
 
 ## vanilla javascript
 1. boilerplate
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
2. it required the use of an XMLHttpRequest object, a JavaScript object that is used to retrieve data. 
`onreadystatechange` is an event handler that is called whenever the value of the readyState property changes. 
`.open()` creates and structures the request. It tells the request what method to use, GET or POST, and what URL to query.
Calling the `.send()` method sends the xhr object with its relevant information to the API URL.

3. 'GET'
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

4. Recall that in a GET request, the query information (what you're asking the server to return) is generally sent as part of the URL whereas in a POST request, the information is sent to the server as part of the body of the request. This information is created and saved in the data constant and sent to the API as an argument passed to the .send() method.

5. The first two lines of this request are identical to the first two lines of the GET request. The third line is new. The data that we want to send to our API must be formatted properly. **The particular properties and values sent will depend on the API you're using and the information you wish to send and retrieve.**

The object containing this data is passed to the JSON.stringify() method, which will **format the object as a string**. This is saved to a const called data.

6. So far, we've only been writing GET requests which request information from another site. Specifically, we've been entering shortened URLs and retrieving the original. If we want to shorten a URL, we have to use a POST request. This is because we'll be asking Google to store this URL and its shortened version — we're introducing new information into Google's database rather than retrieving existing information.

7. 'POST'
```javascript
// Include data for accessing Google APIs

const apiKey = 'AIzaSyAv4hU-zRjuCQg3j6TbDLLGuGTMa6Fza3o';
const url="https://www.googleapis.com/urlshortener/v1/url";
// Some page elements

const $inputField = $('#input');
const $expandButton = $('#expand');
const $shortenButton = $('#shorten');
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

function shortenUrl() {
	const urlWithKey=url+'?key='+apiKey;
  const urlToShorten=$inputField.val();
  const data=JSON.stringify({longUrl:urlToShorten});
  const xhr=new XMLHttpRequest();
  xhr.responseType='json';
  xhr.onreadystatechange=function(){
    if (xhr.readyState === XMLHttpRequest.DONE) {
      console.log(xhr.response);
      $responseField.append('<p>Your shortened url is: </p><p>' + xhr.response.id + '</p>');
    }
  };
  xhr.open('POST',urlWithKey);
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.send(data);
}

function expand() {
  $responseField.empty();
  expandUrl();
  return false;
}

function shorten() {
  $responseField.empty();
  shortenUrl();
  return false;
}

// Call functions on submit

$expandButton.click(expand);
$shortenButton.click(shorten);

```

## jQuery $.ajax

1. $.ajax() is a **method** provided by the jQuery library specifically to handle AJAX requests. All parts of the request are included in a single **object** that is passed to the method as an **argument**.

2. boilerplate
'GET'
```javascript
$.ajax({
  url:'https://api-to-call.com/endpoint',
  type:'GET', //This property is optional for GET requests because it is the default setting
  dataType:'json',  
  success(response){
    console.log(response);
  },
  error(jqXHR,status,errorThrown){
    console.log(jqXHR);  //jqXHR is the XHR response object returned by the $.ajax() method. 
  }
});
```
'POST'
The main differences are the type property, which will have a value of POST and the inclusion of the data property, which will have a value of an object passed to the JSON.stringify() method.
```javascript
$.ajax({
  url:'https://api-to-call.com/endpoint',
  type:'POST',
  data:JSON.stringify({id:200}),
  dataType:'json',
  success(response){
    console.log(response);
  },
  error(jqXHR,status,errorThrown){
    console.log(jqXHR);    
  }
});
```


3. 'GET'
```javascript
function expandUrl() {
  const urlToExpand = url + 
        '?key=' + apiKey +
        '&shortUrl=' + $inputField.val();
  $.ajax({
    url:urlToExpand,
    type:'GET',
    dataType:'json',
    success(response){
      $responseField.append('<p>Your expanded url is: </p><p>' + response.longUrl + '</p>');
    },
    error(jqXHR,status,errorThrown){
      console.log(jqXHR);
    }
  });
}
```

4. 'Post'
```javascript
function shortenUrl() {
  const urlWithKey = url + '?key=' + apiKey;
  const urlToShorten=$inputField.val();

  $.ajax({
    url:urlWithKey,
    type:'POST',
    dataType:'json',
    data:JSON.stringify({longUrl:urlToShorten}),
    contentType:'application/json',
    success(response){
      $responseField.append('<p>Your shortened url is: </p><p>' + response.id + '</p>');
    },
    error(jqXHR,status,errorThrown){
      console.log(jqXHR);
    }
  });
}
```
5. $.get()
```javascript
$.get('https://api-to-call.com/endpoint', response => {...}, 'json');
```

```javascript
function expandUrl() {
  const urlToExpand = url + 
        '?key=' + apiKey +
        '&shortUrl=' + $inputField.val();
  $.get(urlToExpand,response=>{
    $responseField.append('<p>Your expanded url is: </p><p>'+response.longUrl+'</p>');
  },'json');
};
```

6. $.post()
```javascript
$.post('https://api-to-call.com/endpoint', {data}, response => {...}, 'json');
```

```javascript
$.post({
    url: urlWithKey, 
    data: JSON.stringify({longUrl: urlToShorten}), 
    dataType: 'json', 
    contentType: 'application/json', 
    success(response) {
      $responseField.append('<p>Your shortened url is: </p><p>' + response.id + '</p>');
    },
    error(jqXHR, status, errorThrown) {
      console.log(jqXHR);
    }
  });
```

7. $.getJSON()
```javascript
$.getJSON(urlToExpand, response => {
  	$responseField.append('<p>Your expanded url is: </p><p>' +
  	response.longUrl + '</p>');
	});
```

# Promise

## fetch
A Promise is an object that acts as a **placeholder** for data that has been requested but not yet received. Eventually, a Promise will **resolve to the value requested or to a reason why the request failed**.

If the requested information or any error except a network error is received, the Promise is **fulfilled** and calls a function to handle the response. If there is a **network error**, the Promise is **rejected** and will call a function to 
handle the error.

1. fetch()
The fetch() function
* creates a **request object** using the information provided to it
* sends that request object to the URL provided
* returns a Promise that ultimately resolves to a **response object**, which contains a lot of information, including (if everything went well), the information requested.

2. We chain a .then() method to the closing parentheses of the fetch() function. This is **where the asynchronicity of JavaScript comes in** - the fetch() function makes the request and returns the response, and **we don't call the function that will handle the response until it has been received**.



### fetch get 
1. boilerplate

```javascript
//.then() takes two callback functions as parameters, the first of which handles success and the second of which handles failure.
fetch('https://api-to-call.com/endpoint').then(response=>{ 

  //response is the resolution of the Promise returned by the fetch() function.
  if(response.ok){
    return response.json();
  }
  throw new Error('Request failed!'); 
  //This error will only be thrown if response.json() is not returned because the response was not ok.
},
networkError=>console.log(networkError.message) 
//This error will only be thrown if response.json() is not returned because the response was not ok.
).then(jsonResponse=>{
  ....deal with jsonResponse 
  //This is an object that contains the information we requested from the API and we can use that information on our website.
});
//Because the .json() method takes some time to implement, 
//it returns a Promise that will eventually resolve with the desired JSON object. 
//We will then chain another .then() method call to use the converted response object: response.json().
```

2. what's a Response object
```javascript
function expandUrl() {
  const urlToExpand=url + '?shortUrl=' + $inputField.val() + '&key=' + apiKey;
  fetch(urlToExpand).then(response=>{
    if(response.ok){
      console.log(response);
      console.log(response.json()); // response.json() returns a promise
    }    
  });
};
```
<img src="https://github.com/zhaaaa7/javascript/blob/master/ajax/fetch-response.png" alt="Reponse object">

 what's a promise
 
<img src="https://github.com/zhaaaa7/javascript/blob/master/ajax/ajax-promise.png" alt="ajax-promise">


3. full fetch()

response=>(): to handle the Promise if it resolves

networkError=>(): to handle network errors if the Promise is rejected

```javascript
function expandUrl() {
const urlToExpand=url + '?shortUrl=' + $inputField.val() + '&key=' + apiKey;
  fetch(urlToExpand).then(response=>{
    if(response.ok){
      return response.json();
    }
    throw new Error('Request failed!');
  },networkError=>{
    console.log(networkError.message);
  });
};
```
we want to be able to access the information **returned with the Promise**. This is why we're going to chain an additional .then() method.

4. what's a jsonResponse
```javascript
fetch(url).then(response => {
  // Code 
}, networkError => {
  // Code
}).then( jsonResponse => console.log(jsonResponse) );
```

<img src="https://github.com/zhaaaa7/javascript/blob/master/ajax/jsonResponse.png" alt="ajax-promise">

### fetch post 
1. On the first line of the code, the fetch() function is called. We pass it two arguments - the **URL of the API** to call and a **settings object**. This settings object includes the method, POST, and an additional property - body. The value of body is the data that we need to send to the API passed to the JSON.stringify() method as an argument. Depending on the API, you may include other information in the settings object as well. You can find a list of accepted settings https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch. https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch

2. boilerplate

```javascript
fetch('https://api-to-call.com/endpoint',
  {
    method:'POST',
    body:JSON.stringify({id: '200'})
}).then(response=>{
  if(response.ok){
    return response.json();
  }
  throw new Error('Request failed!');
},networkError=>console.log(networkError.message))
.then(jsonResponse=>jsonResponse);
```
3. full Post

we're introducing new information into Google's database rather than retrieving existing information.

```javascript
function shortenUrl() {
  const urlWithKey = url + '?key=' + apiKey;
  const urlToShorten = $inputField.val();
  fetch(urlWithKey, {
    method: 'POST', 
    headers: {
      "Content-type": "application/json"
    }, 
    body: JSON.stringify({longUrl: urlToShorten})
  }).then(response=>{
    if(response.ok){
       console.log(response.json());
     }
  });
};
```
<img src="https://github.com/zhaaaa7/javascript/blob/master/ajax/fetch-POST.png" alt="fetch-POST">

```javascript
function shortenUrl() {
  const urlWithKey = url + '?key=' + apiKey;
  const urlToShorten = $inputField.val();
  fetch(urlWithKey, {
    method: 'POST', 
    headers: {
      "Content-type": "application/json"
    }, 
    body: JSON.stringify({longUrl: urlToShorten})
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Request failed!');
  }, networkError => console.log(networkError.message)).then(jsonResponse=>{
    $responseField.append('<p> Your shortened URL is </p><p>' + jsonResponse.id + '</p>');
return jsonResponse;
  });
};
```

## async / await
1. The async keyword creates a function that will **return a Promise**. You use it as regular function.
2. We use a **try/catch** statement to separate the code that will handle success from the code that will handle errors.
3. We use the **await** keyword to tell the program to continue moving through the message queue while the Promise resolves. 

### 'GET'
1. boilerplate
```javascript
async function getData(){
  try {
    let response= await fetch('https://api-to-call.com/endpoint');
    //save the returned Promise
    
    //checks if the ok property of the response object evaluates to a truthy value.
    if(response.ok){
       let jsonResponse= await response.json();
       //await the resolution of calling the .json() method on the response object.
       return jsonResponse;
     }
    throw new Error('Request failed!');
  }catch(error){
    console.log(error);
  }
}
```
2. full 'GET'
```javascript
async function expandUrl(){
  const urlToExpand = url + '?shortUrl=' + $inputField.val() + '&key=' + apiKey;
  try{
    let response=await fetch(urlToExpand);
    if(response.ok){
       let jsonResponse=await response.json();
       $responseField.append('<p> Your expanded URL is </p><p>' + jsonResponse.longUrl+ '</p>');
	return jsonResponse;
    }
    throw new Error('Request failed!');
  }catch(error){
    console.log(error);
  }
}
```

### POST
1. boilerplate
```javascript
async function getData(){
  try {
    let response= await fetch('https://api-to-call.com/endpoint',{
      method:'POST',
      body: JSON.stringify({id:200}),
    });
    
    if(response.ok){
       let jsonResponse= await response.json();
      return jsonResponse;
     }  
    throw new Error('Request failed!');
    
  }catch(error){
    console.log(error);
  }
}
```

2. full 'POST'
```javascript
async function shortenUrl(){
  const urlToShorten = $inputField.val();
  const urlWithKey = url + '?key=' + apiKey;
  try{
    let response= await fetch(urlWithKey,{
      method:'POST',
      body:JSON.stringify({longUrl: urlToShorten}),
      headers: {"Content-type": "application/json"}
    });
    
    if(response.ok){
       let jsonResponse= await response.json();
       $responseField.append('<p> Your shortened URL is </p><p>' + jsonResponse.id + '</p>');
       return jsonResponse;
     }
     throw new Error('Request failed!');
  }catch(error){
    console.log(error);
  }
}
```
### async
You call the shortenUrl() as usual, however, you can chain a then() method to get the returned value.
```javascript
function shorten() {
  $responseField.empty();
  console.log(shortenUrl());  // a promise
  shortenUrl().then(res=>console.log('lala',res)); // the value the promise resloved to
  return false;
};
```

<img src="https://github.com/zhaaaa7/javascript/blob/master/ajax/async.png" alt="async">
