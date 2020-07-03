const bcrypt = require('bcryptjs');

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
      validate: { len: [0, 32] },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Creating a custom method for our User model.
  // This will check if an unhashed password entered by the user
  // can be compared to the hashed password stored in our database
  User.prototype.validPassword = (password) => bcrypt.compareSync(password, this.password);

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
