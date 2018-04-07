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
  const urlToExpand = url +  '?key=' + apiKey +'&shortUrl=' + $inputField.val();
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
