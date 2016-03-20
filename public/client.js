'use strict';
// function to create and place DOM nodes in
// document after request response returns
function clientDrawResults(request){
  // clear shortUrlResults div
  // and generate new anchor DOM element
  document.querySelector('.shortUrlResults').innerHTML = '';
  let resultAnchor = document.createElement('a');
  // pull url string form request results
  let resultUrl = JSON.parse(request.response).shorturl;
  // create href attribute for anchor element
  // then set value to url
  // and attach to anchor element
  let resultAnchorUrl = document.createAttribute('href');
  resultAnchorUrl.value = 'http://' + resultUrl;
  resultAnchor.setAttributeNode(resultAnchorUrl);
  // set link text to url
  // and append to the anchor
  let resultText = document.createTextNode(resultUrl);
  resultAnchor.appendChild(resultText);
  // create new h3 element
  let resultHeaderEl = document.createElement('h3');
  // append link to h3 element
  resultHeaderEl.appendChild(resultAnchor);
  // create new h2 for response header text
  let resultTitleEl = document.createElement('h2');
  let resultTitle = document.createTextNode("Here's your new shorter url!");
  resultTitleEl.appendChild(resultTitle);
  // append h2 to shortUrlResults div
  // and then append h3 to shortUrlResults div
  document.querySelector('.shortUrlResults').appendChild(resultTitleEl).appendChild(resultHeaderEl);
}

// function to alert user to invalid url submission
function clientOriginHighlight(state){
  document.getElementsByName('origin')[0].style.boxShadow = "0 0 14px " + state;
}

// function to validate url before submission
function urlIsValid(url){
  let urlExpr = new RegExp('((http)s?|ftp):\\/\\/(\\w+\\.)?\\w+\\.\\w+\\/?(\\w+(-\\w+)*(\\.\\w+(\\?\\S+)?)?)?');
  if(url.match(urlExpr)){
    return true;
  }else{
    return false;
  }
}

// function to create open new connection to
// server and submit url request
function clientSubmitForm(origin){
  // build request url query
  let data = '?origin=' + origin;
  let request = new XMLHttpRequest();
  request.onreadystatechange = function clientAJAXReadyStateChange(){
    if(request.readyState === 4 && request.status === 200){
      clientDrawResults(request);
    }
  }
  request.open('POST', '/new/'+data, true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send(null);
}

// event listener for form submission
document.getElementsByTagName('form')[0]
.addEventListener('submit', function clientJSEventListenerSubmit(event){
  event.preventDefault();
  let origin = document.getElementsByName('origin')[0].value;
  if(urlIsValid(origin)){
    clientSubmitForm(origin);
  }
});
// event listener for keyup to check url in real time
document.getElementsByName('origin')[0]
.addEventListener('keyup', function clientJSEventListenerKeyUp(event){
  let origin = document.getElementsByName('origin')[0].value;
  if(urlIsValid(origin)){
    clientOriginHighlight('green');
  }else{
    clientOriginHighlight('red');
  }
});
