'use strict'

const log4js = require('log4js');

const logger = log4js.getLogger('Service getTeams.js');
logger.level = 'debug';

// obtain team database operations
const teamDaos = require('../../daos/teamDaos');

/**
 * getTeams service
 * use the teamDaos to get the teams' data from the database
 * @return {object} database records
 */
function getTeams() {
  logger.debug('getTeams service');

  return new Promise((resolve, reject) => {
    teamDaos.getTeams()
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = getTeams;
