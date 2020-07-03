'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Animals', 
      [
        { 
            uuid: 'fdda765f-fc57-5604-a269-52a7df8164ef',
            UserUuid: 'fdda765f-fc57-5604-a269-52a7df8164ed',
            name: 'bones',
            createdAt: '2014-01-01',
            updatedAt: '2014-01-01',
            difficulty: 'easy',

            hunger: 6,
            fatigue: true,
  
            bathroom: 4,
            sick: false, 

            boredom: 3,
            bored: false,

            health: 8,
            healthy: true,
        },
        { 
          uuid: 'fdda765f-fc57-5604-a269-52a7df8164eg',
          UserUuid: 'fdda765f-fc57-5604-a269-52a7df8164ec',
          name: 'snuggles',
          createdAt: '2014-01-01',
          updatedAt: '2014-01-01',
          difficulty: 'medium',

          hunger: 6,
          fatigue: true,

          bathroom: 4,
          sick: false, 

          boredom: 3,
          bored: false,

          health: 8,
          healthy: true,
        },
        { 
          uuid: 'fdda765f-fc57-5604-a269-52a7df8164eh',
          UserUuid: 'fdda765f-fc57-5604-a269-52a7df8164ec',
          name: 'snape',
          createdAt: '2014-01-01',
          updatedAt: '2014-01-01',
          difficulty: 'hard',

          hunger: 6,
          fatigue: true,

          bathroom: 4,
          sick: false, 

          boredom: 3,
          bored: false,

          health: 8,
          healthy: true,
        }
      ]
    // , {}
    
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Animals');
  }
};