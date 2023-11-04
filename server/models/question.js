module.exports = function (sequelize, DataTypes) {
    const question = sequelize.define(
        'question',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            question_text: {
                type: DataTypes.STRING
            },
            difficulty: {
                type: DataTypes.ENUM('лако', 'средње', 'тешко'),
                defaultValue: 'лако',
                allowNull: false
            },
            importance: {
                type: DataTypes.ENUM('мање', 'средње', 'битно'),
                defaultValue: 'мање',
                allowNull: false
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
