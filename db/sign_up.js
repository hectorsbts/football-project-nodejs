const pool = require('./db_pool');

function signUp(name, lastName, email, password) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject('Error connecting to the database');
      }

      const query = `INSERT INTO users (name, last_name, email, password) VALUES('${name}','${lastName}','${email}','${password}')`;

      connection.query(query, (err, results) => {
        connection.release();

        if (err) {
          reject(err);
        }

        resolve(results);
      });
    });
  });
}

module.exports = signUp;
