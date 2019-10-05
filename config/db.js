'use strict'

const mysql = require('mysql');
const config = require('./constants');
console.log(config);


// configure mysql connection
const pool = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
});

module.exports = pool;
