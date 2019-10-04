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

// PUT method - UPDATE TEAM & TOURNAMENT DATA
function updateTeam(teamId, newData){
  return new Promise( (resolve, reject) => {
    db.getConnection( ( err, connection) => {
      if(err) { 
        reject('Error connecting to the Database') 
      }
      
      // goal_difference CALCULATION  
      let goals_favor = 0;
      let goals_against = 0;
      let goal_difference;

      let points;
      Object.entries(newData).forEach( teamData => {
        // GET TEAMS RESPECTIVE COLUMNS
        db.query(`DESCRIBE teams`, (err, result) => {
          if(err) { reject(err) };
          
          result.forEach( column => {
            // UPDATE TEAMS TABLE
            if( teamData[0] === column.Field ){
              db.query(`UPDATE teams SET ${teamData[0]}='${teamData[1]}' WHERE id=${teamId}`, (err) => {
                if(err){ reject(err) };
              })
            }
            
            // UPDATE TOURNAMENT TABLE
            else {
              db.query(`UPDATE tournament_games SET ${teamData[0]}=${teamData[1]} WHERE team_id=${teamId}`, (err) => {
                if(err){ reject(err) };
              })
              
              // SET goals_in_favor & goals_against
              switch( teamData[0] ){ 
                case 'goals_favor':
                  goals_favor = teamData[1]
                break;
                case 'goals_against':
                  goals_against = teamData[1]
                break;
              }
            }
          })
        })
      });
      
      // UPDATE GAMES PLAYED
        db.query(`SELECT team_id, games_won, games_lost, games_tied FROM tournament_games WHERE team_id=${teamId}`, (err, result) => {
          if(err){ reject(err) };

          result.forEach( games => {

            let games_played = (games.games_won) + (games.games_tied) + (games.games_lost);
            points = (games.games_won * 3) + (games.games_tied);
            
            db.query(`UPDATE tournament_games SET games_played=${games_played} WHERE team_id=${teamId}`, (err) => {
              if(err){ reject(err) };
            })
            // UPDATE POINTS (?)
            db.query(`UPDATE tournament_games SET points SET=${points} WHERE team_id=${teamId}`, (err) => {
                if(err){ reject(err) };
            });
          })
        })

      // UPDATE GOALS DIFFERENCE
      setTimeout( () => {
        goal_difference = ( goals_favor ) - ( goals_against ); 
        db.query(`UPDATE tournament_games SET goal_difference=${goal_difference} WHERE team_id=${teamId}`, (err) => {
          if(err) { reject(err) };
        });              
      }, 1000);


      // UPDATE POSITION
      db.query(`SELECT team_id, points FROM tournament_games ORDER BY points DESC`, (err, teams) => {
        teams.forEach( (team, position) => {

          db.query(`UPDATE tournament_games SET position=${position+1} WHERE team_id=${team.team_id}`, (err) => {
            if(err){ reject(err) };
          })

        })
      });
            /** This is for internal check due no GET method to tournament_games
             * 
             * db.query('SELECT * FROM tournament_games', (err, result) => {
             *   console.log(result);
             * });
             * 
             */
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
