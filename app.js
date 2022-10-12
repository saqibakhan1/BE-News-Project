const express = require("express")
const { getTopics, getArticleById, getUsers } = require("./controllers/controller")


const app = express()



app.get("/api/topics", getTopics)
app.get("/api/articles/:article_id", getArticleById)

app.get('/api/users', getUsers)

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