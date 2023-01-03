const { Model, DataTypes } = require('sequelize')

class users extends Model {
    static init(sequelize) {
        super.init({
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
                unique: true
            },
            password: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.hasMany(models.rosters, { foreignKey: 'userId', as: 'rosters' })
    }
}

module.exports = users