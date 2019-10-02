const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { getTeams } = require('./footballFunctions');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/teams', (req, res) => {
  res.set({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  });

  getTeams()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

// get images
app.get('/assets/teamlogos/:img', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets/teamlogos', req.params.img));
});

app.listen(port || 4000, () => {
  console.log(`Node server running on ${port}`);
});
