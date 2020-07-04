const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./models');
const routes = require('./routes');

const app = express();

const PORT = process.env.PORT || 8081;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/', routes);

app.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) {
    return res.sendStatus(401);
  }
  db.User.findOne({
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

app.post('/login', (req, res) => {
  db.User.findOne({
    where: { username: req.body.username },
  })
    .then(async (user) => {
      if (await bcrypt.compare(req.body.password, user.password)) {

        const accessToken = generateAccessToken(user.dataValues);
        const refreshToken = jwt.sign(user.dataValues, process.env.REFRESH_TOKEN_SECRET);

        res.json({ accessToken, refreshToken });
      } else {
        res.send('No match!');
      }
    })
    // res.json(results.username)) // todo, needs to return as logged in or a token
    .catch((err) => res.send(`Something went wrong ${err}.`));
});

app.delete('/logout', (req, res) => {
  // reassign refreshtokens to no longer include the present refresh token
  res.sendStatus(204);
});

function generateAccessToken(user) {
  return jwt.sign(user.dataValues, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
});
