module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
        'user',
        {
            GSS_identification: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            first_name: {
                type: DataTypes.STRING
            },
            last_name: {
                type: DataTypes.STRING
            },
            nickname: {
                type: DataTypes.STRING
            },
            logged_in_for_testing: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            user_type: {
                type: DataTypes.ENUM(
                    'корисник',
                    'администратор',
                    'супер администратор'
                ),
                defaultValue: 'корисник',
                allowNull: false
            }
        },
        {
            timestamps: false
        }
    )

    user.associate = function (models) {
        user.hasMany(models.result, {
            onDelete: 'RESTRICT',
            foreignKey: 'user_id'
        })
    }
    return user
}
