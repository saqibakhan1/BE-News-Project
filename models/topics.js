const db = require("../db/connection") // importing connection.js file


//export variable (to controllers) and return DB query
exports.selectTopics = () => {
    return db.query("SELECT * FROM topics")
    .then((result) => {
        return result.rows
    })
}

