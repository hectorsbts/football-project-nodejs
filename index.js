const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const pool = require("./db_pool");

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, 'index.html'));
  pool.getConnection((err,connection)=>{
    res.set({"Content-Type":"application/json"})
    if(err){
      res.send({"Message":"Nel perro"});
    }
    connection.query("SELECT * FROM teams", (err,rows)=>{
      connection.release();
      if(err){
        res.send({"Message":"Nel perro " + err.toString()});
      }
      res.send(rows);
    });
  });
});

// get images
app.get('/assets/teamlogos/:img', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets/teamlogos', req.params.img));
});

app.listen(port || 4000, () => {
  console.log(`Node server running on ${port}`);
});
