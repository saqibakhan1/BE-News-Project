const express = require("express")
const { getTopics, getArticleById } = require("./controllers/controller")

const app = express()



app.get("/api/topics", getTopics)
app.get("/api/articles/:article_id", getArticleById)

app.all('/*', (req, res) => {
    res.status(404).send({ msg: "invalid URL- path not found" });
  });

 
  app.use((err,req,res,next) => {
    console.log(err)
    if (err.code === '22P02') {
      console.log(err)
    res.status(400).send({msg: "Article number is not valid :("})} 
    else if (err.status) {
      res.status(404).send({msg: "Article number does not exist :("})} 
      else 
    {next(err)}})

module.exports = app