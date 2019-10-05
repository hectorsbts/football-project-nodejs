'use strict'

// get the function that send responses regarding teams
const getTeams = require('./getTeams');
const getTeam = require('./getTeam');
const updateTeam = require('./updateTeam');
const getImage = require('./getImage');

// export functions
module.exports = {
  getTeams,
  getTeam,
  updateTeam,
  getImage,
};
