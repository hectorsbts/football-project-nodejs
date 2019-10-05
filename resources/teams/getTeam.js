'use strict'

const log4js = require('log4js');

const logger = log4js.getLogger('Resource getTeam.js');
logger.level = 'debug';

// obtain team services
const teamServices = require('../../services/teams');

/**
 * getTeam resource
 * use the getTeam service to get the team info from the database
 * @return {object} Database records
 */
function getTeam(req, res) {
  logger.debug('getTeam resource');
  // get teams' data from database
  return teamServices.getTeam(req.params.id)
    .then((result) => {
      logger.debug('sending result of getting the team with the getTeam resource');
      res.set('Content-Type', 'application/json');
      res.send({
        status: 'success',
        message: 'Team retrieved successfully',
        data: result,
      });
    })
    .catch((err) => {
      res.send({
        status: 'failure',
        message: 'There was an error retrieving the team\'s data',
        data: err,
      });
    });
}

module.exports = getTeam;
