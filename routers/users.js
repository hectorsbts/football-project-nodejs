'use strict'

// get router
const usersRouter = require('express').Router();

// get resource (the one sending the responses)
const users = require('../resources/users');

// get filters
const userDataValidator = require('../filters/users');

// JSON schema validator middleware
usersRouter.post('/', userDataValidator.newUserDataValidator);
usersRouter.post('/login', userDataValidator.loginDataValidator);

// set routes
usersRouter.post('/', users.signUp);
usersRouter.post('/login', users.logIn);

module.exports = usersRouter;
