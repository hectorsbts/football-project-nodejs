'use strict'

// modules
const Ajv = require('ajv');
const log4js = require('log4js');

const ajv = new Ajv();
const logger = log4js.getLogger('Schema Sign Up');
logger.level = 'debug';

// get schema
const newUserDataSchema = require('../../validationSchemas/newUserDataValidatorSchema');

/**
 * newUserDataValidator middleware
 * validate the body of the request goes according to the schema
 * @param {object} req - client request with the token
 * @param {object} res - response in case token is invalid or expired
 * @param {function} next - callback to the next middleware
 * @return {object} JSON response with failure
 */
function newUserDataValidator(req, res, next) {
  logger.debug('validate new user data against JSON schema');
  const valid = ajv.validate(newUserDataSchema, req.body);

  if (!valid) {
    logger.error('new user data not valid');
    res.status(400);
    res.send({
      status: 'failure',
      message: 'The sign up data is not valid.',
      data: ajv.errors,
    });
  } else {
    // if data is valid, proceed
    next();
  }
}

module.exports = newUserDataValidator;
