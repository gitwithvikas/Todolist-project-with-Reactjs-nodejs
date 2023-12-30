
const mysql = require('mysql')
// we can use .env for credential
const connection = mysql.createConnection({
    host:'localhost',
    user:'test',
    database:'todolist',
    password:'mongoose'
})


module.exports = connection;