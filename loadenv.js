/**
 * read .env file and put it in process.env
 * if .env does not exists, `.env.default` will be used instead
 */

const path = require('path');
const dotenv = require('dotenv');

try {
  const env = process.env.ENV;
  switch (env) {
    case 'testing':
      dotenv.config({
        path: path.resolve('.env.testing'),
      });
      break;
    case 'production':
      dotenv.config({
        path: path.resolve('.env.production'),
      });
      break;
    default:
      dotenv.config({
        path: path.resolve('.env.default'),
      });
      process.env.ENV = 'development';
      break;
  }
} catch (e) {
  dotenv.config({
    path: path.resolve('.env.default'),
  });
}
