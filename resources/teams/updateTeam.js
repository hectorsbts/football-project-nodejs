'use strict'

const log4js = require('log4js');

const logger = log4js.getLogger('Resource getTeams.js');
logger.level = 'debug';

// obtain team services
const teamServices = require('../../services/teams');

/**
 * updateTeam resource
 * use the updateTeam service to update the information of a certain team in the database
 * @return {object} Database records with updated information
 */
function updateTeam(req, res) {
  logger.debug('updateTeam resource');
  // get teams' data from database
  return teamServices.updateTeam(req.params.id, req.body)
    .then((result) => {
      logger.debug('sending result of updating the team with the updateTeam resource');
      res.set('Content-Type', 'application/json');
      res.send({
        status: 'success',
        message: 'Teams updated successfully',
        data: result,
      });
    })
    .catch((err) => {
      res.send({
        status: 'failure',
        message: 'There was an error updating the teams\' data',
        data: err,
      });
    });
}

module.exports = updateTeam;
