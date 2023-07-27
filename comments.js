// create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const { randomBytes } = require('crypto');

// setup middleware
app.use(bodyParser.json());

// setup in-memory storage
const commentsByPostId = {};

// setup routes
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  // create a unique id for each comment
  const commentId = randomBytes(4).toString('hex');
  // get the content from the request body
  const { content } = req.body;
  // get the comments for the post
  const comments = commentsByPostId[req.params.id] || [];
  // add the new comment to the comments array
  comments.push({ id: commentId, content, status: 'pending' });
  // update the comments array for the post
  commentsByPostId[req.params.id] = comments;
  // emit a comment created event
  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: { id: commentId, content, postId: req.params.id, status: 'pending' }
  });
  // send a response
  res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  console.log('Event Received:', req.body.type);
  // get the event type
  const { type, data } = req.body;
  // check if the event is a comment moderated event
  if (type === 'CommentModerated') {
    // get the comment from the comments for the post
    const { id, postId, status, content } = data;
    const comments = commentsByPostId[postId];
    // find the comment in the comments array
    const comment = comments.find(comment => {
      return comment.id === id;
    });
    // update the comment status
    comment.status = status;
    // emit a comment updated event
    await axios.post('http://localhost:4005/events', {
      type: 'CommentUpdated',
      data: { id, postId, status, content }
    });
  }
  // send a response
  res.send({});
});