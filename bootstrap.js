const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const environment = require('./environments/environment');

module.exports = {
  path,
  express,
  bodyParser,
  environment,
  bcrypt,
};
