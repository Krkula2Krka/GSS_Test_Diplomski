module.exports = function (sequelize, DataTypes) {
    const result = sequelize.define(
        'result',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            points_acquired: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                validate: {
                    min: 0,
                    max: 30
                }
            },
            test_passed: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            questions_answers: {
                type: DataTypes.JSON,
                defaultValue: '[]'
            },
            date_of_application: {
                type: DataTypes.DATEONLY,
                defaultValue: sequelize.NOW
            }
        },
        {
            timestamps: false
        }
    )
    return result
}
