const mysql = require('mysql');
const environment = require('../environments/environment');

const pool = mysql.createPool({
  host: environment.DB_HOST,
  user: environment.DB_USER,
  password: environment.DB_PASSWORD,
  database: environment.DB_NAME,
});

module.exports = pool;
