'use strict'

// get data validators
const newUserDataValidator = require('./newUserDataValidator');
const loginDataValidator = require('./loginDataValidator');

module.exports = {
  newUserDataValidator,
  loginDataValidator,
};
