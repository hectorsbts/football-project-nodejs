'use strict'

// get the services for the users
const signUp = require('./signUp');
const logIn = require('./logIn');

// export functions
module.exports = {
  signUp,
  logIn,
};
