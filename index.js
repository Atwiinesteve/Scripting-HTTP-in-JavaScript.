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