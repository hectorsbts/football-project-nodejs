const db = require('./db_pool');

function getTeams() {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject('Error connecting to the database');
      }

      // make query to get teams
      connection.query('SELECT * FROM teams', (err, results) => {
        // release connection
        connection.release();

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
  getTeams,
};
