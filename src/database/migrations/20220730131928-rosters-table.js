'use strict';
const { DataTypes } = require("sequelize");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rosters', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      itemsNumber: {
        type: DataTypes.INTEGER,
        default: 0
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
    await queryInterface.dropTable('rosters');
  }
};
