const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const pool = require("./db_pool");
const sign_up = require('./sign_up');
const bcrypt = require('bcryptjs');

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

app.post('/users',(req, res)=>{
  const body = req.body;
  res.set("content-type","application/json")
  if(body.password === body.confirm_password){
    bcrypt.hash(body.password, 5)
    .then(hash=>{
      sign_up(body.name, body.lastName, body.email, body.password)
      .then((result)=>{
        res.status(200);
        res.send("Created");
      })
      .catch((err)=>{
        res.status(400);
        res.send("Error: " + JSON.stringify(err));
      });
    }).catch((e)=>{
      res.status(500);
      res.send("Password error: " + e.Message);
    });
  }else{
    res.status(400);
    res.send("Different password");
  }
});

// get images
app.get('/assets/teamlogos/:img', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets/teamlogos', req.params.img));
});

app.listen(port || 4000, () => {
  console.log(`Node server running on ${port}`);
});
