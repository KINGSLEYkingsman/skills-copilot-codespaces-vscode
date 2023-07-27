// create a web server that can respond to requests for comments
// and send back a list of comments from the server
// this is a node server

// require the http module
var http = require('http');

// create a server
var server = http.createServer(function(request, response) {
  // when a request comes in, respond with a 200 status code
  // and send back a list of comments from the server
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.write('<h1>Comments</h1>');
  response.write('<ul>');
  response.write('<li>first comment</li>');
  response.write('<li>second comment</li>');
  response.write('<li>third comment</li>');
  response.write('</ul>');
  response.end();
});

// start the server
server.listen(3000, function() {
  console.log('Server listening on port 3000');
});