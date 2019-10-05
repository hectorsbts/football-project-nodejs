'use strict'

const log4js = require('log4js');

const logger = log4js.getLogger('Service getTeams.js');
logger.level = 'debug';

// obtain team database operations
const teamDaos = require('../../daos/teamDaos');

/**
 * getTeam service
 * use the teamDaos to get the team's data from the database
 * @return {object} database records
 */
function getTeam(id) {
  logger.debug('getTeam service');

  return new Promise((resolve, reject) => {
    teamDaos.getTeam(id)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = getTeam;
