const { 
  selectTopics,
  selectArticleById,
  selectUsers
  } = require("../models/model")



exports.getTopics = (req, res, next) => {
    selectTopics().then((topics) => {
        res.status(200).send({ topics })
    })
    .catch(next)
}
exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params;
    selectArticleById(article_id)
      .then((response) => {
        res.status(200).send({ article: response });
      })
      .catch((err) => {
        next(err);
      });
};
exports.getUsers = (req, res) => {
    selectUsers()
    .then((users) => {
        res.status(200).send({users})
    })
}