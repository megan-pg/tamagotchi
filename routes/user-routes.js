const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const { User, Animal } = require('../models');

// keeping this for testing but, likely don't want this exposed later on
router.get('/', (req, res) => {
  User.findAll({})
    .then((results) => res.json(results))
    .catch((err) => { throw err; });
});

// get animals / user
router.get('/:username/animals', User.authenticateToken, (req, res) => {
  User.findOne({
    where: { username: req.body.username },
    include: Animal,
  })
    // todo check user and token are related
    .then((data) => {
      if (data.Animals) {
        res.json(data.Animals);
      } else {
        // todo conditional sends an empty array, so this is pointless
        throw new Error('No animals!');
      }
    })
    .catch((err) => res.send(`Something went wrong: ${err}.`));
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
  // expects {"username":"username-here", "password":"password-here"}
  User.findOne({ // CHECK USER EXISTS
    where: { username: req.body.username },
  })
    .then(async (user) => {
      if (User.validPassword(req.body.password, user.password)) { // CHECK PASSWORD IS CORRECT
        // CREATE TOKEN IF USER & PASSWORD ARE GOOD
        const accessToken = User.generateAccessToken(user);
        const refreshToken = jwt.sign(user.dataValues.username, process.env.REFRESH_TOKEN_SECRET);
        user.update({ refreshToken })
          .then((result) => {
            // SENDS TOKEN TO FRONTEND, WHERE IT CAN BE SAVED IN LOCALSTORAGE
            res.json({ accessToken, uuid: user.dataValues.uuid });
          });
      } else {
        res.send('No match!');
      }
    })
    .catch((err) => res.send(`Something went wrong ${err}.`));
});

// logout
router.post('/logout', (req, res) => {
  // todo need to delete the localstorage copy of authtoken as well on the frontend
  User.findOne({
    where: { username: req.body.username },
  })
    .then(async (user) => {
      const obj = {
        refreshToken: null,
      };
      return user.update(obj);
    })
    .then(() => res.sendStatus(204))
    .catch((err) => res.send(`Something went wrong ${err}.`));
});

// create new auth token
router.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) {
    return res.sendStatus(401);
  }
  User.findOne({
    where: { refreshToken },
  })
    .then((result) => {
      if (result.refreshToken == null) {
        return res.sendStatus(403);
      }
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        const accessToken = generateAccessToken({ name: user.name });
        res.json(accessToken);
      });
    })
    .catch((err) => {
      return `Something went wrong: ${err}.`;
    });
});

// delete
router.delete('/delete', User.authenticateToken, (req, res) => {
  const { uuid } = req.body;
  User.findOne({
    where: { uuid },
  })
    .then(async (user) => user.destroy())
    .then((result) => res.send(`${result.username} succesfully deleted!`))
    .catch((err) => res.send(`Something went wrong ${err}.`));
});

// update
// todo: not sure about this one, as an update to the user, may require updates to all
// of their animals
// todo: what would we allow to be updated? email, pass, username
// todo maybe leave this one alone till everything else is buttoned up

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers.authorization;
//   const token = authHeader && authHeader.split(' ')[1];
//   if (token == null) {
//     return res.sendStatus(401);
//   }
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) {
//       return res.sendStatus(403);
//     }
//     req.user = user;
//     next();
//   });
// }

module.exports = router;
