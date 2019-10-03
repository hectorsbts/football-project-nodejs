const pool = require('./db_pool');
function sign_up(name, lastName, email, password) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err,connection)=>{
      if(err){
        reject('DB conection error: ' + err);
      }
      const qry = `INSERT INTO users (name, last_name, email, password) VALUES("${name}","${lastName}","${email}","${password}")`;
      connection.query(qry,(err,rows)=>{
        connection.release();
        if(err){
          reject('DB conection error: ' + err);
        }
        resolve(rows);
      })
    });
  });
}
module.exports = sign_up;