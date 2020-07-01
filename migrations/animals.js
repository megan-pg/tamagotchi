'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Animals', [
        { 
            uuid: 'fdda765f-fc57-5604-a269-52a7df8164ef',
            name: 'snuggles',
            hunger: 50,
            fatigue: 48,
            bathroom: 90,
            love: 12,
            temperature: 30, 
            sick: 7,
            physicality: 88, 
            boredom: 67,
            UserUuid: 'fdda765f-fc57-5604-a269-52a7df8164ec',
            createdAt: '2014-01-01',
            updatedAt: '2014-01-01'
        },
        { 
          uuid: 'fdda765f-fc57-5604-a269-52a7df8164ez',
          name: 'bones',
          hunger: 50,
          fatigue: 48,
          bathroom: 90,
          love: 12,
          temperature: 30, 
          sick: 7,
          physicality: 88, 
          boredom: 67,
          UserUuid: 'fdda765f-fc57-5604-a269-52a7df8164ec',
          createdAt: '2014-01-01',
          updatedAt: '2014-01-01'
      }
    ], {}
    
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Animals');
  }
};