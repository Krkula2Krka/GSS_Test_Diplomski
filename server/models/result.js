module.exports = function (sequelize, DataTypes) {
    const result = sequelize.define(
        'result',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            points_acquired: {
                type: DataTypes.INTEGER,
                allowNull: true,
                validate: {
                    min: 0,
                    max: 30
                }
            },
            test_passed: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            },
            questions_answers: {
                type: DataTypes.JSON,
                allowNull: true
            },
            date_of_application: {
                type: DataTypes.DATE,
                allowNull: true
            }
        },
        {
            timestamps: false
        }
    )
    return result
}
