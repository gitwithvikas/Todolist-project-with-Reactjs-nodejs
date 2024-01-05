const dotenv = require('dotenv')
dotenv.config()

const mysql = require('mysql')

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:process.env.DATABASE,
    password:process.env.PASSWORD
})


module.exports = connection;