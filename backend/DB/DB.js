const mysql = require("mysql2")

const db = mysql.createConnection({
    host:"127.0.0.1",
    port:3306,
    user:"root",
    password:"20011112",
    database:"is_db"
})

module.exports = db