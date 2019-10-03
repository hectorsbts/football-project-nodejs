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

function logIn(email) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject('Error connecting to the database');
      }

      // make query to catch valid users
      const query = `SELECT * FROM users 
      WHERE email='${email}'`;

      connection.query(query, (err, results) => {
        // release connection
        connection.release();

        console.log(results);

        // handle errors
        if (err) {
          reject(err);
        }

        resolve(results);
      });
    });
  });
}

module.exports = {
  signUp,
  logIn,
};
