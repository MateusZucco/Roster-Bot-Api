'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('users', 'telegramId', {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('users', 'telegramId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      })
    ])
  }
};