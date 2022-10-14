const { 
  selectTopics,
  selectArticleById,
  selectUsers,
  updateArticleById

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
///////////////////////////////////

exports.patchArticleById = (req, res, next) => {
   const articleId = req.params.article_id;
   const changeAmount = req.body.inc_votes;

    return updateArticleById(articleId, changeAmount).then((result) => {
    return res.status(201).send({ result });
   });
}