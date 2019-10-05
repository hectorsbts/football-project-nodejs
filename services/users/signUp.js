'use strict'

const bcrypt = require('bcryptjs');
const log4js = require('log4js');

const logger = log4js.getLogger('Service signUp.js');
logger.level = 'debug';

// obtain user database operations
const userDaos = require('../../daos/userDaos');

/**
 * signUp service
 * use the userDaos to add a new user to the database
 * @param {object} body - body of the client's request
 * @return {object} database confirmation or error
 */
function signUp(body) {
  logger.debug('signUp service');

  return new Promise((resolve, reject) => {
    // password and confirm password must match
    if (body.password === body.validatePassword) {
      // generate the salt
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          // error generating salt
          reject(err);
        }

        // hash password
        bcrypt.hash(body.password, salt, (err, hash) => {
          if (err) {
            // error generating hash
            reject(err);
          }

          userDaos.signUp(body, hash)
            .then((result) => {
              resolve(result);
            })
            .catch((err) => {
              // error signing up
              reject(err);
            });
        });
      });
    } else {
      reject({
        error: 'Not matching passwords',
      });
    }
  });
}

module.exports = signUp;
