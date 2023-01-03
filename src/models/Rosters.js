const { Model, DataTypes } = require('sequelize')

class rosters extends Model {
    static init(sequelize) {
        super.init({
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
        this.belongsTo(models.users, { foreignKey: 'userId', as: 'rosters' })
        this.hasMany(models.rostersItems, { foreignKey: 'rosterId', as: 'rosterItems' })
    }
}

module.exports = rosters