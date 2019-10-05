'use strict'

// exporting the environment variables
module.exports = {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  APP_PORT: process.env.APP_PORT,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  ENV: process.env.ENV,
};
