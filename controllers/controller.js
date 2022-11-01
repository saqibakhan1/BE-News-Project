const { 
  selectTopics,
  selectArticleById,
  selectUsers,
  selectArticles,
  fetchCommentsByID,
  createCommentByArticleId

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
exports.getArticles = async (req, res, next) => {
  const {sort_by, order, topic} = req.query;

  try {
    const allArticles = await selectArticles(sort_by, order, topic);
    res.status(200).send({allArticles});
  } catch (err) {
    next(err);
  }
}
exports.getArticleComments = (req, res, next) => {
  fetchCommentsByID(req.params.article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);

    });
}
exports.postCommentsByArticleId = (req, res, next) => {
  console.log(req.body)
  const author = req.body.username;
  
  const body = req.body.body;
  const commentArticleId = req.params.article_id;
  createCommentByArticleId(author,body,commentArticleId).then((comment) => {
  return res.status(201).send({ comment });
})
.catch((err) => {
  next(err);
  });

}

