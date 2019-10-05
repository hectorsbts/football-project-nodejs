'use strict'

const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const log4js = require('log4js');

const logger = log4js.getLogger('Service logIn.js');
logger.level = 'debug';

// obtain user database operations
const userDaos = require('../../daos/userDaos');
const config = require('../../config/constants');

/**
 * signUp service
 * use the userDaos to add a new user to the database
 * @param {string} email - email of the user to log in
 * @return {object} database confirmation or error
 */
function logIn(body) {
  logger.debug('logIn service');

  return new Promise((resolve, reject) => {
    // check user in database
    userDaos.logIn(body.email)
      .then((data) => {
        // compare received password and hash
        bcrypt.compare(
          body.password,
          data.password,
          (err, match) => {
            if (err) {
              // error matching passwords
              reject(err);
            } else if (!match) {
              reject({
                status: 'NO MATCH',
                message: 'Passwords do not match',
              });
            }

            const token = jwt.encode(body, config.TOKEN_SECRET);
            resolve(token);
          },
        );
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = logIn;
