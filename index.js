'use strict'

// load configurations
require('./loadenv');
require('./config/db');

// load modules
const bodyParser = require('body-parser');
const express = require('express');
const log4js = require('log4js');
const apiApp = require('./config/api');
const config = require('./config/constants');

const logger = log4js.getLogger('index.js');

// boot express
const app = express();
const router = express.Router();

// define the level of logs
logger.level = 'debug';

// assign middlewares
app.use(router);
app.use(bodyParser.urlencoded({ extended: false }));

// access-control-allow
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  // give the url of the request to the response
  res.url = req.url;
  next();
});

app.use(bodyParser.json({ limit: '25MB' }));

// establish the main path for the API
app.use('/api', apiApp);

// set the listening port
app.listen(config.APP_PORT, () => {
  logger.info(`Listening to port ${config.APP_PORT} in ${config.ENV} environment`);
});

module.exports = app;
