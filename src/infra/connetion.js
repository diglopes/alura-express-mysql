const mysql = require("mysql")

const conn = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "mysql",
    database: "agendapetshop",
    insecureAuth: true
})

module.exports = conn