const mysql = require("mysql2")

const db = mysql.createConnection({
    host:"localhost:3306",
    port:3306,
    user:"root",
    password:"20011112",
    database:"is_db"
})

module.exports = db