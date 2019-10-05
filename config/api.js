'use strict'

// immediately get the instance of Express
const apiApp = require('express')();

// define modules from the routers folder
const users = require('../routers/users');
const teams = require('../routers/teams');

// define router/route pairs
apiApp.use('/user', users);
apiApp.use('/teams', teams);

module.exports = apiApp;
