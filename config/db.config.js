const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({path: './.env'});

// create connection
const conn = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

conn.connect((err) => {
    if (err) {
        console.warn("Database is not connect. ", err);
    }
    else {
        console.log("Database is connected...");
    }
});

module.exports = conn;