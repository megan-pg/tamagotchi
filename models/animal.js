const { v4: uuidv4 } = require('uuid');

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
          validate: { len: [0,32] }
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
      healthy: {
          type: DataTypes.BOOLEAN,
      }
    });
  
    // --------------------- HELPER FUNCTIONS ---------------------
    Animal.generateInitialStats = function (name, UserUuid, difficulty){
        let atts = ['hunger','fatigue','bathroom','sick','boredom','bored','health','healthy'];
        let obj = 
            {
                name: name,
                difficulty: difficulty,
                total: 0,
                UserUuid: UserUuid,
                uuid: uuidv4(),
            };
        let min;
        let max;

        switch(difficulty){
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

        atts.forEach((att) => {
            obj[att] = Math.floor(Math.random() * (max - min) + min);
        })

        return obj;
    }

    Animal.updateStat = function (difficulty, value, action){
        let obj;
        switch(difficulty){
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
    }

    Animal.updateStats = function (animal){
        // division inverses the difficulty value, to keep easy easy and hard hard
        // user input subtracts from each attribute
        // clock update adds to each attribute
        let atts = ['hunger','bathroom','boredom'];
        let tempTotal = 0;
        att.forEach((att) => {
            animal[att] += 3 / updateStat(animal.difficulty, animal[att], att).att;
            tempTotal += animal[att];
        });
        animal.health = tempTotal/atts.length; // aggregate "health" bar, maybe make this the life or death line

        return animal;
    }

    Animal.legalActions = function(action){
        let legal = ['hunger','bathroom','boredom'];
        if (legal.includes(action)){
            return true;
        }
        return false;
    }

    Animal.associate = (models) => {
      Animal.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Animal;
  };