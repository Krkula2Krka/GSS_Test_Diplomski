module.exports = function (sequelize, DataTypes) {
    const answer = sequelize.define(
        'answer',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            answer_text: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            correctness: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        {
            timestamps: false
        }
    )
    return answer
}
