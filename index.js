// CREATING A SIMPLE POST REQUEST.
function postMessage(msg) {
  try {
    const request = new XMLHttpRequest();
    request.open('POST', '/login.php');
    request.setRequestHeader('Content-Type', 'text/plain, charset=UTF-8');
    request.send(msg);
  } catch (error) {
    console.log({ name: error.name, message: error.message, stack: error.stack })
  }
};

// Getting an HTTP response onreadystatechange
function getTextFromServer(url, callback) {
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.onreadystatechange = function() {
    if(request.readyState === 4 && request.status === 200) {
      var responseType = request.getResponseHeader('Content-Type');
      if(responseType.match(/^text/g)) {
        callback(request.responseText)
      };
    };
  };
  request.send(null);
};