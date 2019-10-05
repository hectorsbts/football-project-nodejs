'use strict'

const log4js = require('log4js');

const logger = log4js.getLogger('Resource getImage.js');
logger.level = 'debug';

// obtain team services
const teamServices = require('../../services/teams');

/**
 * getImage resource
 * use the getImage service to get the image requested
 * @return {object} Database records
 */
function getImage(req, res) {
  logger.debug('getImage resource');
  // get team's logo
  return teamServices.getImage(req)
    .then((result) => {
      logger.debug('sending result of getting the image with the getImage resource');
      res.set('Content-Type', 'image/jpeg, image/png, image/gif');
      res.sendFile(result);
    })
    .catch((err) => {
      res.status(404);
      res.send({
        status: 'failure',
        message: 'There was an error retrieving the team\'s logo',
        data: err,
      });
    });
}

module.exports = getImage;
