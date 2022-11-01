const db = require("../db/connection")

exports.selectTopics = () => {
    return db.query("SELECT * FROM topics")
    .then((result) => {
        return result.rows
    })
}
exports.selectArticleById = (id) => {
    return db.query('SELECT articles.*, COUNT(comment_id)AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = $1 WHERE articles.article_id = $1 GROUP BY articles.article_id;',
    [id])
      .then((result) => {
       if (result["rowCount"] === 0) {
        return Promise.reject({ status: 404, msg: "Article number does not exist :("});
        }
        return result.rows[0]
      })
  }
exports.selectUsers = () => {
    return db
    .query('SELECT * FROM users')
    .then((results) => {
        return results.rows
    })
}
////////////////////////////////////////////////// ARTICLES
exports.selectArticles = async (
  sort_by = "created_at",
  order = "DESC",
  topic
) => {
  if (order.toUpperCase() !== "ASC" && order.toUpperCase() !== "DESC") {
    return Promise.reject({
      status: 400,
      msg: "Invalid sort order",
    });
  }
  if (topic) {
    const validTopics = await db.query(`SELECT slug FROM topics;`);
    const isTopicValid = validTopics.rows.some((validTopic) => {
      return topic === validTopic.slug;
    });
    if (!isTopicValid) {
      return Promise.reject({
        status: 404,
        msg: "Topic does not exist",
      });
    }
  }

  let queryStr = `
  SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, CAST(COUNT(comments.comment_id) AS INT) AS comment_count
  FROM articles
  LEFT JOIN comments ON (articles.article_id = comments.article_id) `;

  if (topic) {
    queryStr += `
  WHERE articles.topic = '${topic}'`;
  }
  queryStr += `
  GROUP BY articles.article_id`;
  if (sort_by) {
    queryStr += `
    ORDER BY ${sort_by}`;
    if (order) queryStr += ` ${order.toUpperCase()}`;
  }
  queryStr += ";";

  const selectedArticles = await db.query(queryStr);

  return selectedArticles.rows;
}

///////////////////////
exports.fetchCommentsByID = async (articleID) => {
  const commentsResponse = await db.query(
    `SELECT * FROM comments WHERE article_id = $1 order by created_at desc;`,
    [articleID]
  )
  if (commentsResponse.rowCount === 0) {
    const isValidArticleID = await db.query(
      `SELECT * FROM articles WHERE article_id = $1;`,
      [articleID]
    )
    if (isValidArticleID.rowCount === 0) {
      return Promise.reject({
        status: 404,
        code:234,
        msg: `This article_id does not exist`,
      })
  }
}

  return commentsResponse.rows;
}
exports.createCommentByArticleId = (author, body, commentArticleId) => {
  return db.query(
      `INSERT INTO comments (author, body, article_id) 
    VALUES($1,$2,$3) RETURNING *;`,
      [author, body, commentArticleId]
    )
    .then((comment) => {

      return comment.rows[0];
    })
}