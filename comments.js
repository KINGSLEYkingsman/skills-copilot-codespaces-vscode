// create a web server that can accept incoming data from users
// and then save that data to a file on the server
// then read that data from the file and send it back to the user

// 1. create a web server using express
// 2. create a route for GET /comments
// 3. read the comments.json file and send back its content to the user
// 4. create a route for POST /comments
// 5. read the comments.json file, parse the content, add the new comment to the array, save the file again, and send back a success message to the user

const express = require('express')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()

app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/comments', (req, res) => {
  const commentsPath = path.join(__dirname, 'comments.json')
  const commentsJSON = fs.readFileSync(commentsPath).toString()
  const comments = JSON.parse(commentsJSON)

  res.json(comments)
})

app.post('/comments', (req, res) => {
  const commentsPath = path.join(__dirname, 'comments.json')
  const commentsJSON = fs.readFileSync(commentsPath).toString()
  const comments = JSON.parse(commentsJSON)

  const newComment = req.body
  newComment.id = comments.length + 1

  comments.push(newComment)

  const newCommentsJSON = JSON.stringify(comments, null, 2)
  fs.writeFileSync(commentsPath, newCommentsJSON)

  res.json({
    success: true,
    message: 'Thanks for your comment!'
  })
})

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})