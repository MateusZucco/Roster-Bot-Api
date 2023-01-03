'use strict';
const { DataTypes } = require("sequelize");
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', { 
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      telegramId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.dropTable('users');
  }
};
