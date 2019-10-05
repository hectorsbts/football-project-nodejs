'use strict'

const jwt = require('jsonwebtoken');
const config = require('../config/constants');
const log4js = require('log4js');

const logger = log4js.getLogger('Filter tokenValidator.js')

// set logger level
logger.level = 'debug';

/**
 * tokenValidator filter
 * get token from header (session token)
 * filter to validate the token
 * @param {object} req - client request with the token
 * @param {object} res - response in case token is invalid or expired
 * @param {object} next - method to continue to next middleware
 */
function tokenValidator(req, res, next) {
  logger.debug('token validator');
  let token = req.header('Authorization') || req.header('x-access-token');

  if (token.startsWith('Bearer ')) {
    // remove 'Bearer' from token
    token = token.slice(7, token.length);
  }

  if (token) {
    logger.debug('verifying token');
    jwt.verify(token, config.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        logger.fatal('token provided does not match');
        res.status(401);
        res.send({
          status: 'failure',
          message: 'Authorization tokens do not match',
          data: err,
        });
      }

      logger.debug('token valid');
      req.decoded = decoded;
      next();
    });
  } else {
    logger.fatal('token was not provided');
    res.status(401);
    res.send({
      status: 'failure',
      message: 'Authorization token was not provided',
      data: {},
    });
  }
}

module.exports = tokenValidator;
