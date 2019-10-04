const db = require('./db_pool');
const bodyParser = require('../bootstrap');

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

function updateTeam(teamId, newData){
  return new Promise( (resolve, reject) => {
    db.getConnection( ( err, connection) => {
      if(err) { 
        reject('Error connecting to the Database') 
      }
      
      let goals_in_favor = 0;
      let goals_against = 0;
      let goals_difference;

      Object.entries(newData).forEach( teamData => {
        // GET teams TABLE COLUMNS
        db.query(`DESCRIBE teams`, (err, result) => {
          if(err) { reject(err) };
          
          result.forEach( column => {
            // UPDATE TO teams TABLE
            if( teamData[0] === column.Field ){
              db.query(`UPDATE teams SET ${teamData[0]}='${teamData[1]}' WHERE id=${teamId}`, (err) => {
                if(err){ reject(err) };
              })
            }
            // UPDATE TO tournament TABLE
            else {
              db.query(`UPDATE tournament_games SET ${teamData[0]}=${teamData[1]} WHERE team_id=${teamId}`, (err) => {
                if(err){ reject(err) };
              })
              
              // SET goals_in_favor & goals_against
              switch( teamData[0] ){ 
                case 'goals_in_favor':
                  goals_in_favor = teamData[1]
                break;
                case 'goals_against':
                  goals_against = teamData[1]
                break;
              }
            }
          })
        })
      });
      //UPDATE TO goals_difference
      setTimeout( () => {
        goals_difference = ( goals_in_favor ) - ( goals_against ); 
        console.log(goals_difference)
        db.query(`UPDATE tournament_games SET goals_difference=${goals_difference} WHERE team_id=${teamId}`, (err) => {
          if(err) { reject(err) };
        });              
      }, 1000);

      connection.release();
      resolve(`Team ${teamId} updated.`);
    })
  })
};

module.exports = {
  getTeams,
  addTeam,
  updateTeam
};
