const express = require("express")
const { getTopics, getArticleById, getUsers, getArticles, getArticleComments, postCommentsByArticleId } = require("./controllers/controller")

app.use(cors());

const app = express()
app.use(express.json());

app.get("/api/topics", getTopics)
app.get("/api/articles/:article_id", getArticleById)
app.get('/api/users', getUsers)
app.get('/api/articles', getArticles)
app.get("/api/articles/:article_id/comments", getArticleComments)
app.post('/api/articles/:article_id/comments', postCommentsByArticleId)

app.all('/*', (req, res) => {
    res.status(404).send({ msg: "invalid URL- path not found" });
  });

 
  app.use((err,req,res,next) => {
    if (err.code === '22P02') {
    res.status(400).send({msg: "Article number is not valid :("})} 
    else if (err.status) {
      res.status(404).send({msg: "Article number does not exist :("})} 
      else 
    {next(err)}})

module.exports = app