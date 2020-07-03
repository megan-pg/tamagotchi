const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Animal = sequelize.define('Animal', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV1,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [0, 32] },
    },
    difficulty: {
      type: DataTypes.STRING,
    },

    hunger: {
      type: DataTypes.INTEGER,
    },
    fatigue: {
      type: DataTypes.BOOLEAN,
    },

    bathroom: {
      type: DataTypes.INTEGER,
    },
    sick: {
      type: DataTypes.BOOLEAN,
    },

    boredom: {
      type: DataTypes.INTEGER,
    },
    bored: {
      type: DataTypes.BOOLEAN,
    },

    health: {
      type: DataTypes.INTEGER,
    },
    unhealthy: {
      type: DataTypes.BOOLEAN,
    },
  });

  // --------------------- HELPER FUNCTIONS ---------------------
  Animal.generateInitialStats = (name, UserUuid, difficulty) => {
    let min;
    let max;

    switch (difficulty) {
      case 'easy':
        min = 2;
        max = 5;
        break;
      case 'medium':
        min = 4;
        max = 7;
        break;
      case 'hard':
        min = 6;
        max = 8;
        break;
      default:
        min = 2;
        max = 8;
    }

    const atts = ['hunger','bathroom','boredom'];
    const bools = ['fatigue', 'sick', 'bored'];
    let tempTotal = 0;
    const obj = {
      name,
      difficulty,
      total: 0,
      UserUuid,
      uuid: uuidv4(),
    };

    atts.forEach((att, index) => {
      obj[att] = Math.floor(Math.random() * (max - min) + min);
      obj[bools[index]] = Animal.tripBoolean(att);
      tempTotal += obj[att];
    });

    obj.health = tempTotal / atts.length; // health being an aggregate of the other attributes
    obj.unhealthy = Animal.tripBoolean(obj.health);

    return obj;
  };

  Animal.tripBoolean = (value) => {
    if (value > 5) {
      return true;
    }
    return false;
  };

  Animal.updateStat = (difficulty, value, action) => {
    const obj = {};
    switch (difficulty) {
      case 'easy':
        obj[action] = value - 3;
        break;
      case 'medium':
        obj[action] = value - 2;
        break;
      case 'hard':
        obj[action] = value - 1;
        break;
      default:
        obj[action] = value - 3;
    }

    return obj;
  };

  // division inverses the difficulty value, to keep easy easy and hard hard
  // user input subtracts from each attribute
  // clock update adds to each attribute
  Animal.updateStats = (animal) => {
    const tempAnimal = { ...animal };
    const atts = ['hunger', 'bathroom', 'boredom'];
    let tempTotal = 0;

    atts.forEach((att) => {
      tempAnimal[att] += 3 / this.updateStat(tempAnimal.difficulty, tempAnimal[att], att)[att];
      tempTotal += animal[att];
    });
    tempAnimal.health = tempTotal / atts.length; // aggregate "health" bar

    return tempAnimal;
  };

  Animal.legalActions = (action) => {
    const legal = ['hunger', 'bathroom', 'boredom'];
    if (legal.includes(action)) {
      return true;
    }
    return false;
  };

  Animal.associate = (models) => {
    Animal.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Animal;
};
