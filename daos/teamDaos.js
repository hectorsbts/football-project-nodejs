'use strict'

// database operations regarding teams
const db = require('../config/db');

/**
 * getTeams method
 * get all the teams' data
 * @return {object} database records
 */
function getTeams() {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject('Error connecting to the database');
      }

      // make query to get teams
      connection.query('SELECT * FROM teams', (err, teams) => {
        // handle errors
        if (err) {
          // release connection
          connection.release();
          reject(err);
        }

        connection.query('SELECT * FROM tournament_games', (err, tournament) => {
          connection.release();

          if (err) {
            reject(err);
          }

          const results = [];
          // get the stats of each team and join them in a single object
          teams.forEach((team) => {
            const stats = tournament.find((stat) => stat.team_id === team.id);

            if (stats) {
              results.push({ ...team, ...stats });
            }
          });

          resolve(results);
        });
      });
    });
  });
}

/**
 * getTeam method
 * get the team's data
 * @return {object} database records
 */
function getTeam(id) {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject('Error connecting to the database');
      }

      // make query to get teams
      connection.query(`SELECT * FROM teams WHERE id=${id}`, (err, teams) => {
        // handle errors
        if (err) {
          // release connection if there's an error
          connection.release();
          reject(err);
        }

        connection.query(`SELECT * FROM tournament_games WHERE team_id=${id}`, (err, results) => {
          // release connection
          connection.release();

          if (err) {
            reject(err);
          }

          // join the team results with the tournament results
          const result = { ...teams[0], ...results[0] };
          resolve(result);
        });
      });
    });
  });
}

function updateTeam(teamId, newData) {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) { 
        reject('Error connecting to the database');
      }
      
      let goalsFavor = 0;
      let goalsAgainst = 0;
      let goalDifference;

      Object.entries(newData).forEach(teamData => {
        // GET teams TABLE COLUMNS
        db.query(`DESCRIBE teams`, (err, result) => {
          if (err) {
            reject(err);
          }
          
          result.forEach((column) => {
            // UPDATE TO teams TABLE
            if (teamData[0] === column.Field) {
              db.query(`UPDATE teams SET ${teamData[0]}='${teamData[1]}' WHERE id=${teamId}`, (err) => {
                if (err) {
                  reject(err);
                }
              });
            }
            // UPDATE TO tournament TABLE
            else {
              db.query(`UPDATE tournament_games SET ${teamData[0]}=${teamData[1]} WHERE team_id=${teamId}`, (err) => {
                if (err) {
                  reject(err);
                }
              });

              // SET goals_in_favor & goals_against
              switch (teamData[0]) {
                case 'goals_in_favor':
                  goalsFavor = teamData[1]
                break;
                case 'goals_against':
                  goalsAgainst = teamData[1]
                break;
              }
            }
          });
        });
      });

      // UPDATE TO goals_difference
      setTimeout(() => {
        goalDifference = goalsFavor - goalsAgainst; 
        db.query(`UPDATE tournament_games SET goal_difference=${goalDifference} WHERE team_id=${teamId}`, (err) => {
          if (err) {
            reject(err); 
          }
        });
      }, 1000);

      connection.release();
      resolve(`Team ${teamId} updated.`);
    });
  });
}

// export team's database operations
module.exports = {
  getTeams,
  getTeam,
  updateTeam,
};
