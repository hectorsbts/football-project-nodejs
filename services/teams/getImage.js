'use strict'

const log4js = require('log4js');
const path = require('path');
const fs = require('fs');

const logger = log4js.getLogger('Service getImage.js');
logger.level = 'debug';

/**
 * getImage service
 * send the image requested by the client
 * @param {object} req - client's request with the token
 * @return {file} team logo image
 */
function getImage(req) {
  logger.debug('getImage service');

  const image = path.resolve(`assets/teamlogos/${req.params.img}`);

  return new Promise((resolve, reject) => {
    // confirm the image is a file
    fs.stat(image, (err, stats) => {
      if (err) {
        reject(err);
        return;
      }

      if (stats.isFile()) {
        resolve(image);
      }
    });
  });
}

module.exports = getImage;
