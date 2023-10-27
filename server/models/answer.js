module.exports = function (sequelize, DataTypes) {
    const answer = sequelize.define(
        'answer',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            answer_text: {
                type: DataTypes.STRING,
                allowNull: true
            },
            correctness: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            }
        },
        {
            timestamps: false
        }
    )
    return answer
}
