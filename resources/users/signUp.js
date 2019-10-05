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
function signUp(req, res) {
  logger.debug('signUp resource');
  // add user to database
  return userServices.signUp(req.body)
    .then((result) => {
      logger.debug('sending result of adding user with the signUp resource');
      res.set('Content-Type', 'application/json');
      res.status(201);
      res.send({
        status: 'success',
        message: 'User signed up successfully',
        data: result,
      });
    })
    .catch((err) => {
      res.send({
        status: 'failure',
        message: 'There was an error signing up the user',
        data: err,
      });
    });
}


module.exports = signUp;
