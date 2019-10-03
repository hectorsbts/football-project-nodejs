const {
  path,
  express,
  bodyParser,
  environment,
  bcrypt,
} = require('./bootstrap');

const { getTeams } = require('./db/footballFunctions');
const { signUp } = require('./db/sign_up');

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

// add teams
app.post('/teams', (req, res) => {
  res.set({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  });

  addTeams(req.body)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

app.post('/users', (req, res) => {
  res.set('Content-Type', 'application/json');
  
  const { body } = req;
  if (body.password === body.confirm_password) {
    bcrypt
      .hash(body.password, 5)
      .catch((err) => {
        res.status(500);
        res.send(err.Message);
      })
      .then((hash) => signUp(body.name, body.lastName, body.email, hash))
      .then((result) => {
        res.status(201);
        res.send(result);
      })
      .catch((err) => {
        res.status(400);
        res.send(err);
      });
  } else {
    res.status(400);
    res.send('Different password');
  }
});

// get images
app.get('/assets/teamlogos/:img', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets/teamlogos', req.params.img));
});

app.listen(port || 4000, () => {
  console.log(`Node server running on ${port}`);
});
