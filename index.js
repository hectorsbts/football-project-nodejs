const {
  path,
  express,
  bodyParser,
  environment,
} = require('./bootstrap');

const { getTeams } = require('./db/footballFunctions');

const app = express();
const port = environment.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// get teams
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
