const { Model, DataTypes } = require('sequelize')

class rostersItems extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true
            },
            rosterId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'rosters', key: 'id' },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            text: {
                type: DataTypes.STRING,
                allowNull: false
            },
            icon: {
                type: DataTypes.STRING,
            },
            position: {
                type: DataTypes.INTEGER,
                default: 0
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: new Date(),
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: new Date(),
                allowNull: false
            }
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.rosters, { foreignKey: 'rosterId', as: 'rosterItems' })
    }
}

module.exports = rostersItems