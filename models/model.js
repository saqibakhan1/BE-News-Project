const db = require("../db/connection")



exports.selectTopics = () => {
    return db.query("SELECT * FROM topics")
    .then((result) => {
        return result.rows
    })
}
exports.selectArticleById = (id) => {
    return db.query(`SELECT * from articles where article_id=$1 `, [id] )
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

////////////////////////////////////////////


exports.updateArticleById = (articleId, changeVotes) => {
  return db
    .query(
      `UPDATE articles SET votes = votes 
    + $2 WHERE article_id = $1 RETURNING *;`,
      [articleId, changeVotes]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};