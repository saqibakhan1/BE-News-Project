const express = require("express")
const { getTopics, getArticleById } = require("./controllers/controller")

const app = express()



app.get("/api/topics", getTopics)
app.get("/api/articles/:article_id", getArticleById)

app.all('/*', (req, res) => {
    res.status(404).send({ msg: "invalid URL- path not found" });
  });

module.exports = app