function mysql(){
    const dotenv = require("dotenv");
    dotenv.config();

    const mysql = require("mysql");
    
    const db = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    });

    return db;
};

module.exports = mysql();