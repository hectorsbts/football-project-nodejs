const db = require('./db_pool');
const bodyParser = require('../bootstrap');
// const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

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

function logOn(req) {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject('Error connecting to the database');
      }

      // make query to catch valid users
      let sql = `SELECT * FROM users 
      WHERE email='${req.body.email}'
      AND password='${req.body.password}'`;

      connection.query(sql, (err, results) => {
        // release connection
        connection.release();

        // handle errors
        if (err) {
          reject(err);
        }
        if (results.length>0){
          let token = jwt.sign(result[0], 'secret');
          resolve(token);
        } else {
          resolve('User or password incorrect');
        }
      })
    })
  })
}

module.exports = {
  getTeams,
  logOn
};
