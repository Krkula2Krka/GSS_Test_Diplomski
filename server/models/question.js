module.exports = function(sequelize, DataTypes) {
    const question = sequelize.define('question', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        question_text: {
            type: DataTypes.STRING,
            allowNull: true
        },
        difficulty: {
            type: DataTypes.ENUM('lako', 'srednje', 'tesko'),
            allowNull: true
        },
        importance: {
            type: DataTypes.ENUM('manje', 'srednje', 'bitno'),
            allowNull: true
        }
    }, {
        timestamps: false
    })

    question.associate = function(models) {
        question.hasMany(models.answer, {
            onDelete: 'CASCADE',
            foreignKey: 'question_id'
        })
    }

    return question
}