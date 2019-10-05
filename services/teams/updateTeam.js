'use strict'

const log4js = require('log4js');

const teamDaos = require('../../daos/teamDaos');
const logger = log4js.getLogger('Service getImage.js');
logger.level = 'debug';

/**
 * updateTeam service
 * update the team and tournament data with the data sent by the client
 * @param {object} teamId - id of the team to update
 * @param {object} newData - new data for the team
 * @return {object} database record with data updated
 */
function updateTeam(teamId, newData) {
  logger.debug('updateTeam service');

  return new Promise((resolve, reject) => {
    // update team in the database
    teamDaos.updateTeam(teamId, newData)
      .then(() => teamDaos.getTeam(teamId))
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = updateTeam;
