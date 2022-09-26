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

// Getting an HTTP response onreadystatechange Asynchronously.
function getTextResponseFromServerAsync(url, callback) {
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      var responseType = request.getResponseHeader('Content-Type');
      if (responseType.match(/^text/g)) {
        callback(request.responseText)
      };
    };
  };
  request.send(null);
};

// Getting an HTTP response Synchronously.
function getTextResponseFromServerSync(url, callback) {
  var request = new XMLHttpRequest();
  request.open('GET', url, false);
  if (request.status !== 200) throw new Error(request.statusText);
  var type = request.getResponseHeader('Content-Type');
  if (!type.match(/^text/g)) throw new Error(`Expected Textual Type but got: ${type}`);
  return request.responseText;
};

// Parsing the HTTP response
function get(url, callback) {
  try {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        var type = request.getRequestHeader('Content-Type');
        if (type.indexOf('xml') !== -1 && request.responseXML) {
          callback(request.responseXML);
        } else if (type === 'application/json') {
          callback(JSON.parse(request.responseText))
        } else {
          callback(request.responseText);
        };
      };
    };
    request.send(null);
  } catch (error) {
    console.log({ name: error.name, message: error.message, stack: error.stack })
  }
};