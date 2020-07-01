module.exports = (sequelize, DataTypes) => {
    const Animal = sequelize.define('Animal', {
      uuid: {
          type: DataTypes.UUID,
          defaultValue: sequelize.UUIDV1,
          primaryKey: true
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: { len: [0,32] }
      },
      hunger: {
          type: DataTypes.INTEGER,
      },
      fatigue: {
          type: DataTypes.INTEGER,
      },
      bathroom: {
          type: DataTypes.INTEGER,
      },
      love: {
          type: DataTypes.INTEGER,
      },
      temperature: {
          type: DataTypes.INTEGER,
      },
      sick: {
          type: DataTypes.INTEGER,
      },
      physicality: {
          type: DataTypes.INTEGER,
      },
      boredom: {
          type: DataTypes.INTEGER,
      }
    });
  
    Animal.associate = (models) => {
      Animal.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Animal;
  };