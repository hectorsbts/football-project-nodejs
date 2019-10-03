'use strict'

const football = require('./db/footballFunctions');
const {bodyParser, express} = require('./bootstrap');

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/',(req,res) => {
  football.logOn(req)
  .then((record) => {
    res.set('Content-Type','application/json');
    res.send(record);
  });
});

app.listen(port, () => {
  console.log(`Init connection, listening in port ${port}`);
})