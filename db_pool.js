const mysql = require("mysql");

const pool = mysql.createPool({
    host:"us-cdbr-iron-east-05.cleardb.net",
    user:"b2538f4f533eb2",
    password:"60d607b6",
    database:"heroku_de56c3051b37109"
});

module.exports = pool;