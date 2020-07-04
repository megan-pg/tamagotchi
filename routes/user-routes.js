const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Animal } = require('../models');

// keeping this for testing but, likely don't want this exposed later on
router.get('/', (req, res) => {
  User.findAll({})
    .then((results) => res.json(results))
    .catch((err) => { throw err; });
});

// get animals / user
router.get('/:username/animals', authenticateToken, (req, res) => {
  User.findOne({
    where: { username: req.user.username },
    include: Animal,
  })
    // todo is there a better way to do this? the findone above returns the password as well
    .then((data) => res.json(data.Animals))
    .catch((err) => { throw err; });
});

// create
router.post('/create', (req, res) => {
  const { email, username, password } = req.body;

  User.create({
    email,
    username,
    password,
    uuid: uuidv4(),
  })
    .then((results) => res.send(`${results.username} created successfully!`))
    .catch((err) => res.json(`Something went wrong: ${err.errors[0].message}`));
});

// login
router.post('/login', (req, res) => {
  // expects username & password
  // todo credentials with passport
  // todo this may turn into a very different endpoint seeing as its for logging in
  // todo so not sure what will be done with the animal being returned
  User.findOne({
    where: { username: req.body.username },
  })
    .then(async (user) => {
      if (await bcrypt.compare(req.body.password, user.password)) {
        // res.send(`${req.body.username} signed in successfully!`);
        const accessToken = jwt.sign(user.dataValues, process.env.ACCESS_TOKEN_SECRET);
        res.json({ accessToken });
      } else {
        res.send('No match!');
      }
    })
    // res.json(results.username)) // todo, needs to return as logged in or a token
    .catch((err) => res.send(`Something went wrong ${err}.`));
});

// update
// todo: not sure about this one, as an update to the user, may require updates to all
// of their animals
// todo: what would we allow to be updated? email, pass, username
// todo maybe leave this one alone till everything else is buttoned up

// delete
router.delete('/delete/', (req, res) => {
  // todo will likely need to double check authentication here, lest we have randos hitting delete
  // something like:
  //     if(authToken == valid){
  //         do the thing
  //     }else{
  //         get bent
  //     }
  const { uuid } = req.body;
  User.findOne({
    where: { uuid },
  })
    .then(async (user) => user.destroy())
    .then((result) => res.send(`${result.username} succesfully deleted!`))
    .catch((err) => res.send(`Something went wrong ${err}.`));
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

module.exports = router;
