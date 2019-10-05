'use strict'

// database operations regarding users
const db = require('../config/db');

/**
 * signUp method
 * add a user to the database
 * @param {object} data user's data
 * @param {string} hash user's password hashed
 * @return {object} database confirmation
 */
function signUp(data, hash) {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject('Error connecting to the database');
      }

      const query = `INSERT INTO users (name, last_name, email, password) VALUES ('${data.firstName}','${data.lastName}','${data.email}','${hash}')`;

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

/**
 * logIn method
 * obtain the user's password to compare it
 * @param {string} email user's email
 * @return {object} database record
 */
function logIn(email) {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject('Error connecting to the database');
      }

      // make query to catch valid users
      const query = `SELECT * FROM users 
      WHERE email='${email}'`;

      connection.query(query, (err, results) => {
        // release connection
        connection.release();

        // handle errors
        if (err) {
          reject(err);
        }

        resolve(results[0]);
      });
    });
  });
}

// export user's database operations
module.exports = {
  signUp,
  logIn,
};
