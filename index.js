const {
  path,
  express,
  bodyParser,
  environment,
  bcrypt,
  jwt,
} = require('./bootstrap');

const { signUp, logIn } = require('./db/user');
const { getTeams, addTeam } = require('./db/footballFunctions');

const app = express();
const port = process.env.PORT || environment.PORT;

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

  addTeam(req.body)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

// sign up a new user
app.post('/users', (req, res) => {
  res.set('Content-Type', 'application/json');
  
  const { body } = req;
  if (body.password === body.confirm_password) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        res.status(400);
        res.send(err);
      }

      bcrypt.hash(body.password, salt, (err, hash) => {
        if (err) {
          res.status(400);
          res.send('Error generating the hash');
        }

        signUp(body, hash)
          .then((result) => {
            res.status(201);
            res.send(result);
          })
          .catch((err) => {
            res.status(400);
            res.send(err);
          });
      });
    });
  } else {
    res.status(400);
    res.send('Different password');
  }
});

// login
app.post('/login', (req, res) => {
  res.set('Content-Type', 'application/json');
  logIn(req.body)
    .then((data) => {
      bcrypt.compare(req.body.password, data.password, (err, match) => {
        if (err) {
          res.send(err);
        } else if (!match) {
          res.send({
            message: 'Password incorrect',
          });
        } else {
          const token = jwt.encode(req.body, 'secret');
          res.send(token);
        }
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

// get images
app.get('/assets/teamlogos/:img', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets/teamlogos', req.params.img));
});

app.listen(port, () => {
  console.log(`Node server running on ${port}`);
});
