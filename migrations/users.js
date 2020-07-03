'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', 
      [
        { 
            uuid: 'fdda765f-fc57-5604-a269-52a7df8164ec',
            username: 'dwright',
            email: 'douglas.wrightiii@gmail.com',
            password: 'password1',
            createdAt: '2013-01-01',
            updatedAt: '2013-01-01'
        },
        { 
            uuid: 'fdda765f-fc57-5604-a269-52a7df8164ed',
            username: 'Senor Blanco',
            email: 'douglas.wrightiii@live.com',
            password: 'password2',
            createdAt: '2013-01-01',
            updatedAt: '2013-01-01'
        }
      ]
    // , {}
    );
  },

  down:  (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};