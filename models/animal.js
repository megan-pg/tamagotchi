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
    species: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    dead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
  Animal.generateInitialStats = (name, UserUuid, difficulty, species) => {
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

    const atts = ['hunger', 'bathroom', 'boredom'];
    const bools = ['fatigue', 'sick', 'bored'];
    let tempTotal = 0;
    const obj = {
      name,
      difficulty,
      species,
      total: 0,
      UserUuid,
      uuid: uuidv4(),
    };

    atts.forEach((att, index) => {
      obj[att] = Math.floor(Math.random() * (max - min) + min);
      obj[bools[index]] = Animal.tripBoolean(att);
      tempTotal += obj[att];
    });

    obj.health = Math.floor(tempTotal / atts.length); // health being an aggregate of the other attributes
    obj.unhealthy = Animal.tripBoolean(obj.health);

    return obj;
  };

  Animal.tripBoolean = (value) => {
    if (value > 5) {
      return true;
    }
    return false;
  };

  Animal.updateStat = (difficulty, value, action, user) => {
    const obj = {};
    let min;
    let max;

    if (action === 'dead') {
      obj.dead = true;
    } else {
      switch (difficulty) {
        case 'easy':
          min = 3;
          max = 5;
          break;
        case 'medium':
          min = 2;
          max = 4;
          break;
        case 'hard':
          min = 1;
          max = 3;
          break;
        default:
          min = 2;
          max = 5;
      }

      const less = Math.floor(Math.random() * (max - min) + min);
      const more = Math.floor(Math.random() * (3 - 1) + 1);

      obj[action] = user ? value - less : value + more;

      // making sure the values stay between 0 - 10
      if (user && obj[action] < 0) {
        obj[action] = 0;
      } else if (!user && obj[action] > 10) {
        obj[action] = 10;
      }
    }

    return obj;
  };

  Animal.updateStats = async (animal) => {
    const tempAnimal = { ...animal.dataValues };
    const atts = ['hunger', 'bathroom', 'boredom'];
    const bools = ['fatigue', 'sick', 'bored'];
    let tempTotal = 0;
    atts.forEach((att, index) => {
      tempAnimal[att] = Math.floor(Animal.updateStat(
        tempAnimal.difficulty,
        tempAnimal[att],
        att,
        false,
      )[att]);
      // todo move the bool check & health check into separate functions
      tempAnimal[bools[index]] = Animal.tripBoolean(tempAnimal[att]);
      tempTotal += tempAnimal[att];
    });

    tempAnimal.health = Math.floor(tempTotal / atts.length); // aggregate "health" bar
    tempAnimal.unhealthy = Animal.tripBoolean(tempAnimal.health);
    tempAnimal.age += 1;

    return tempAnimal;
  };

  Animal.legalActions = (action) => {
    const legal = ['hunger', 'bathroom', 'boredom', 'dead'];
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
