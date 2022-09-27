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
    console.log({ name: error.name, message: error.message, stack: error.stack });
  };
};


// FORM ENCODED REQUESTS.
// Encoding an object for an HTTP request.
function encodeFormData(data) {
  try {
    if(!data) return '';
    let pairs = [];
    for(var name in data) {
      if(!data.hasOwnProperty(name)) continue;
      if(typeof data[name] === 'function') continue;
      var value = data[name].toString();
      name = encodeURIComponent(name.replace(' ', '+'));
      value = encodeURIComponent(value.replace(' ', '+'));
      pairs.push(name + ' = ' + value);
    };
  } catch(error) {
    console.log({ name: error.name, message: error.message, stack: error.stack });
  };
  return pairs.join('&');
};

// Making an HTTP POST request with form-encoded data
function postFormData(url, data, callback) {
  try {
    var request = new XMLHttpRequest();
    request.open('POST', url);
    request.onreadystatechange = function() {
      if(request.readyState === 4 && request.status === 200) {
        callback(request)
      }
    };
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(encodeFormData(data));
  } catch(error) {
    console.log({ name: error.name, message: error.message, stack: error.stack });
  }
}

// Making a GET request with form-encoded data
function getFormData(url, data, callback) {
  try {
    var request = new XMLHttpRequest();
    request.open('GET', url + '?' + encodedFormData(data));
    request.onreadystatechange = function() {
      if(request.readyState === 4 && request.status === 200) {
        callback(request)
      }
    };
    request.send(null);
  } catch(error) {
    console.log({ name: error.name, message: error.message, stack: error.stack });
  }
};

// JSON Encoding.
// Making an HTTP POST request with a JSON-encoded body.
function postJSONEncodedData(url, data, callback) {
  try {
    var request = new XMLHttpRequest();
    request.open('POST', url);
    request.onreadystatechange = function() {
      if(request.readyState === 4 && request.status === 200) {
        callback(request);
      }
    };
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(data));
  } catch(error) {
    console.log({ name: error.name, message: error.message, stack: error.stack });
  }
};

// File upload with an HTTP POST request.
function fileUpload() {
  try {
    var inputElements = document.getElementsByTagName('input');
    for( var i = 0; i < inputElements.length; i++) {
      var input = inputElements[i];
      if(input.type !== 'file') continue;
      var url = input.getAttribute('data-uploadto');
      if(!url) continue;
      input.addEventListener('change', function() {
        var file = this.files[0];
        if(!file) return;
        var request = new XMLHttpRequest();
        request.open('POST', url);
        request.send(file)
      }, false);
    }
  } catch(error) {
    console.log({ name: error.name, message: error.message, stack: error.stack });
  };
};

// POSTing multipart/form-data request body.
function postMultiPartFormData(url, data, callback) {
  try {
    if(typeof FormData === 'undefined') throw new Error('FormData not implemented...');
    var request = new XMLHttpRequest();
    request.open('POST', url);
    request.onreadystatechange = function () {
      if(request.readyState === 4 && request.status === 200) {
        callback(request.responseText);
      }
    };
    var formData = new FormData();
    for(var name in data) {
      if(!data.hasOwnProperty(name)) continue;
      var value = data[name].toString();
      if(typeof value === 'function') continue;
      formData.append(name, value)
    };
    request.send(formData);
  } catch (error) {
    console.log({ name: error.name, message: error.message, stack: error.stack });
  }
}