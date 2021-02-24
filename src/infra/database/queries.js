const conn = require("./connection")

const queryExec = (query, params = {}) => {
    return new Promise((resolve, reject) => {
        conn.query(query, params, (error, result) => {
            if(error) {
                reject(error)
            } else {
                resolve(result)
            }   
        })
    })
}

module.exports = queryExec