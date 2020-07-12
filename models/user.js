/* eslint-disable no-param-reassign */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [0, 32],
        noSpecials: (val) => {
          const canContain = RegExp('^[a-zA-Z0-9_]*$');
          if (!canContain.test(val)) {
            throw new Error('Username can\'t contain special characters.');
          }
          return true;
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.TEXT,
    },
  });

  User.validPassword = (pw1, pw2) => bcrypt.compareSync(pw1, pw2);

  User.generateAccessToken = (user) => jwt.sign(user.dataValues, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });

  User.authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token === 'null') {
      res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  };

  User.addHook('beforeCreate', (user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  User.associate = (models) => {
    User.hasMany(models.Animal, {
      onDelete: 'cascade',
    });
  };

  return User;
};
