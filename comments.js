// Create web server

var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var User = require('../models/user');
var Post = require('../models/post');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// GET request to /comments
router.get('/', function(req, res, next) {
  // Get all comments from the database
  Comment.find(function(err, comments) {
    // If there is an error, log it
    if (err) {
      console.log(err);
    } else {
      // If there is no error, render the comments view
      res.render('comments', { comments: comments });
    }
  });
});

// GET request to /comments/add
router.get('/add', function(req, res, next) {
  // Render the add comment view
  res.render('addcomment');
});

// POST request to /comments/add
router.post('/add', function(req, res, next) {
  // Get the data from the form
  var name = req.body.name;
  var email = req.body.email;
  var body = req.body.body;
  var post = req.body.post;

  // Create the comment object
  var comment = new Comment({
    name: name,
    email: email,
    body: body,
    post: post
  });

  // Save the comment object to the database
  comment.save(function(err, comment) {
    // If there is an error, log it
    if (err) {
      console.log(err);
    } else {
      // If there is no error, redirect to /comments
      res.redirect('/comments');
    }
  });
});

// GET request to /comments/delete/:_id
router.get('/delete/:_id', function(req, res, next) {
  // Get the comment id from the url
  var _id = req.params._id;

  // Remove the comment from the database
  Comment.remove({ _id: _id }, function(err) {
    // If there is an error, log it
    if (err) {
      console.log(err);
    } else {
      // If there is no error, redirect to /comments
      res.redirect('/comments');
    }
  });
});

// GET request to /comments/edit/:_id
router.get('/edit/:_id', function(req, res, next) {
  //