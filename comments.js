// create a web server using express
// this server will listen to port 3000
// and will respond to the URL /comments
// with a json object containing a list of comments
// this is just a simple example, in reality
// the comments would be stored in a database
// and the server would access the database to get the comments

// import the express module
const express = require('express');

// create a new express application
const app = express();

// create a route for the URL /comments
// the route will respond to GET requests
// the route will respond with a json object
// containing a list of comments
app.get('/comments', (req, res) => {
  const comments = [
    {
      id: 1,