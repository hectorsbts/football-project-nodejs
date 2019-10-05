'use strict'

// get the function that send responses regarding users
const signUp = require('./signUp');
const logIn = require('./logIn');

// export functions
module.exports = {
  signUp,
  logIn,
};
