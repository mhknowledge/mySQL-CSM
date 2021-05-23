require('dotenv').config();
const util = require('util');

const mysql = require('mysql');

const connection = mysql.createConnection({
    //host:
    host: 'localhost',
    //listening Port:
    port: 3306,
    //db username:
    user: 'root',
    //db name and password:
    database: 'employee_db',
    password: PROCESS.env.MYSQLPASSWORD,

});

connection.connect();
connection.query = util.promisify(connection.query);
module.exports = connection;