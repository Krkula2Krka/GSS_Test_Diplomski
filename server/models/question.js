module.exports = function (sequelize, DataTypes) {
    const question = sequelize.define(
        'question',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            question_text: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            difficulty: {
                type: DataTypes.ENUM('лако', 'средње', 'тешко'),
                defaultValue: 'лако'
            },
            importance: {
                type: DataTypes.ENUM('мање', 'средње', 'битно'),
                defaultValue: 'мање'
            }
        },
        {
            timestamps: false
        }
    )

    question.associate = function (models) {
        question.hasMany(models.answer, {
            onDelete: 'CASCADE',
            foreignKey: 'question_id'
        })
    }
    return question
}
