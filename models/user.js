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

  // Creating a custom method for our User model.
  // This will check if an unhashed password entered by the user
  // can be compared to the hashed password stored in our database
  User.validPassword = (pw1, pw2) => bcrypt.compareSync(pw1, pw2);

  User.generateAccessToken = (user) => {
    return jwt.sign(user.dataValues, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
  };

  User.authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
      throw new Error('401');
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        throw new Error('403');
      }
      req.user = user;
      next();
    });
  };

  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
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
