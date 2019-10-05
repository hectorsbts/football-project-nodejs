'use strict'

const log4js = require('log4js');

const logger = log4js.getLogger('Resource signUp.js');
logger.level = 'debug';

// obtain user services
const userServices = require('../../services/users');

/**
 * signUp resource
 * use the signUp service to add user to database
 * @param {object} req - client request with the token
 * @param {object} res - response in case token is invalid or expired
 * @return {object} JSON response with success or failure
 */
function logIn(req, res) {
  logger.debug('logIn resource');
  // check user in database
  return userServices.logIn(req.body)
    .then((result) => {
      logger.debug('sending result of checking user in database with logIn resource');
      res.set('Content-Type', 'application/json');
      res.send({
        status: 'success',
        message: 'User logged in successfully',
        data: {
          token: result,
        },
      });
    })
    .catch((err) => {
      if (err.hasOwnProperty('status')) {
        if (err.status === 'NO MATCH') {
          res.status(400);
        }
      } else {
        res.status(500);
      }

      res.send({
        status: 'failure',
        message: 'There was an error loggin the user',
        data: err,
      });
    });
}

module.exports = logIn;
