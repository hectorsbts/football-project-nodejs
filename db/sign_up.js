const pool = require('./db_pool');

function signUp(data, hash) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject('Error connecting to the database');
      }

      const query = `INSERT INTO users (name, last_name, email, password) VALUES ('${data.name}','${data.lastName}','${data.email}','${hash}')`;

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
