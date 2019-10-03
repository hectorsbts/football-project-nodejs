const db = require('./db_pool');

function getTeams() {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject('Error connecting to the database');
      }

      // make query to get teams
      connection.query('SELECT * FROM teams', (err, results) => {
        // release connection
        connection.release();

        // handle errors
        if (err) {
          reject(err);
        }

        resolve(results);
      });
    });
  });
}

function addTeam(team) {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject('Error connecting to database');
      }

      // add team to table teams
      connection.query(
        `INSERT INTO teams (name, location, stadium, logo) VALUES ('${team.name}', '${team.location}', '${team.stadium}', '${team.logo}')`,
        (err, results) => {
          if (err) {
            reject(err);
          }

          // add team to table tournament_games
          connection.query(
            `INSERT INTO tournament_games (team_id, position, points, games_played, games_won, games_tied, games_lost, goals_favor, goals_against, goal_difference) VALUES (${results.insertId}, '${team.position}', ${team.points}, ${team.games_played}, ${team.games_won}, ${team.games_tied}, ${team.games_lost}, ${team.goals_in_favor}, ${team.goals_against}, ${team.goals_in_favor - team.goals_against})`,
            (err, results) => {
              connection.release();

              if (err) {
                reject(err);
              }

              resolve(results);
            },
          );
        },
      );
    });
  });
}

module.exports = {
  getTeams,
  addTeam,
};
